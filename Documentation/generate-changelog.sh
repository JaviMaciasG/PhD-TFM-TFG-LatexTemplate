#!/usr/bin/env bash
set -euo pipefail

documentation_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
repository_root=$(cd -- "$documentation_dir/.." && pwd)
release=$(tr -d '\r\n' < "$repository_root/RELEASE.txt")
first_tag=$(git -C "$repository_root" tag --sort=version:refname | sed -n '1p')
output_path=${1:-$documentation_dir/CHANGELOG.md}

[[ -n "$release" ]] || { echo "ERROR: RELEASE.txt is empty." >&2; exit 1; }
[[ -n "$first_tag" ]] || { echo "ERROR: no Git tags were found." >&2; exit 1; }
command -v git-cliff >/dev/null 2>&1 || { echo "ERROR: git-cliff is required to generate the changelog." >&2; exit 1; }

temporary_changelog=$(mktemp)
mkdir -p -- "$(dirname -- "$output_path")"
temporary_output=$(mktemp "${output_path}.tmp.XXXXXX")
trap 'rm -f -- "$temporary_changelog" "$temporary_output"' EXIT

git-cliff \
    --config "$documentation_dir/cliff.toml" \
    --repository "$repository_root" \
    --topo-order \
    --limit-tags 0 \
    "${first_tag}^..${release}" \
    --output "$temporary_changelog"

while IFS= read -r line || [[ -n "$line" ]]; do
    if [[ "$line" == '## ['* ]]; then
        heading=${line#"## ["}
        version=${heading%%]*}
        suffix=${heading#*']'}
        if [[ "$version" == v* ]]; then
            commit=$(git -C "$repository_root" rev-parse "${version}^{commit}")
            mapfile -t aliases < <(git -C "$repository_root" tag --points-at "$commit" --sort=version:refname)
            alias_list=$(printf '%s, ' "${aliases[@]}")
            alias_list=${alias_list%, }
            line="## [${alias_list}]${suffix}"
        fi
    fi
    printf '%s\n' "$line"
done < "$temporary_changelog" > "$temporary_output"

sed -i '${/^$/d;}' "$temporary_output"
mv -- "$temporary_output" "$output_path"
