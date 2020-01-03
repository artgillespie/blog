" want html files to be treated as go templates
" (hugo doesn't seem to allow for other extensions)
"


autocmd BufNewFile,BufRead *.html   set filetype=gohtmltmpl
autocmd! prettier





