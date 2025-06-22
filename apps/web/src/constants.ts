export const EXAMPLE_GRAMMAR = `grammar Expr;
prog: expr EOF;
expr: expr ('*'|'/') expr
     | expr ('+'|'-') expr
     | INT
     | '(' expr ')'
     ;
INT: [0-9]+;
WS: [ \\t\\r\\n]+ -> skip;`;

export const EXAMPLE_INPUT = '1+2*3';