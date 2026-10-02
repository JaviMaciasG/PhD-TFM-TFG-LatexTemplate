for branch in `git branch -a | grep remotes | grep -v HEAD | grep -v master `
do
   CMD="git branch --track ${branch#remotes/origin/} $branch"
   echo "Running [$CMD]"
   $CMD
done

