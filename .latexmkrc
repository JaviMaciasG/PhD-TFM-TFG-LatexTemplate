# LaTeXmk configuration file to make acronyms and symbols to work properly within Overleaf

add_cus_dep('glo', 'gls', 0, 'makeglo2gls');
sub makeglo2gls {
    system("makeindex -s '$_[0]'.ist -t '$_[0]'.glg -o '$_[0]'.gls '$_[0]'.glo");
}

add_cus_dep('acn', 'acr', 0, 'makeacn2acr');
sub makeacn2acr {
    system("makeindex -s \"$_[0].ist\" -t \"$_[0].alg\" -o \"$_[0].acr\" \"$_[0].acn\"");
}

add_cus_dep('sbl', 'sym', 0, 'makesbl2sym');
sub makesbl2sym {
    system("makeindex -s \"$_[0].ist\" -t \"$_[0].alg\" -o \"$_[0].sym\" \"$_[0].sbl\"");
}
