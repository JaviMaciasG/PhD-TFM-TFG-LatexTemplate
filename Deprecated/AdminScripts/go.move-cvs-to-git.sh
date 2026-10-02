rsync -avu macias@geintra-repository-extern:/repository/users/plantilla-unificada-latex .



find -name '*,v' | cvs-fast-export > ~/converted.fe
mkdir /tmp/PhD-TFM-TFG-LatexTemplate/
cd /tmp/PhD-TFM-TFG-LatexTemplate/
git init
git fast-import < ~/converted.fe
git checkout -f
