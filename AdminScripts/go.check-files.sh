
DIR=~/reposito/users/daniel.bermejo/InformesTFG

for f in `find . -type f |grep -v ".git" | grep -v pdf | grep -v jpg | grep -v ppt|grep -v "\.ins" | grep -v README |grep -v "\.aux" |grep -v "\.log" | grep -v "\.js"`
do
    echo "----------------------------------------- $f"
    if [ -f $DIR/$f ]
    then
	diff -u $f $DIR/$f
    else
	echo -n "" #"File $DIR/$f not found"
    fi
    
done
