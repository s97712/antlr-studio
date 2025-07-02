import { StreamLanguage, type StreamParser } from "@codemirror/language";
import { InputStream, Token } from 'antlr4';
import ANTLRv4Lexer from '../generated/ANTLRv4Lexer';

// A map from token types to CSS class names
const tokenTypeToClass: { [key: number]: string } = {
  [ANTLRv4Lexer.TOKEN_REF]: "variableName",
  [ANTLRv4Lexer.RULE_REF]: "typeName",
  [ANTLRv4Lexer.LEXER_CHAR_SET]: "string",
  [ANTLRv4Lexer.DOC_COMMENT]: "comment",
  [ANTLRv4Lexer.BLOCK_COMMENT]: "comment",
  [ANTLRv4Lexer.LINE_COMMENT]: "comment",
  [ANTLRv4Lexer.INT]: "number",
  [ANTLRv4Lexer.STRING_LITERAL]: "string",
  [ANTLRv4Lexer.UNTERMINATED_STRING_LITERAL]: "invalid",
  [ANTLRv4Lexer.BEGIN_ARGUMENT]: "meta",
  [ANTLRv4Lexer.ACTION]: "meta",
  [ANTLRv4Lexer.OPTIONS]: "keyword",
  [ANTLRv4Lexer.TOKENS]: "keyword",
  [ANTLRv4Lexer.CHANNELS]: "keyword",
  [ANTLRv4Lexer.IMPORT]: "keyword",
  [ANTLRv4Lexer.FRAGMENT]: "keyword",
  [ANTLRv4Lexer.LEXER]: "keyword",
  [ANTLRv4Lexer.PARSER]: "keyword",
  [ANTLRv4Lexer.GRAMMAR]: "keyword",
  [ANTLRv4Lexer.PROTECTED]: "keyword",
  [ANTLRv4Lexer.PUBLIC]: "keyword",
  [ANTLRv4Lexer.PRIVATE]: "keyword",
  [ANTLRv4Lexer.RETURNS]: "keyword",
  [ANTLRv4Lexer.LOCALS]: "keyword",
  [ANTLRv4Lexer.THROWS]: "keyword",
  [ANTLRv4Lexer.CATCH]: "keyword",
  [ANTLRv4Lexer.FINALLY]: "keyword",
  [ANTLRv4Lexer.MODE]: "keyword",
  [ANTLRv4Lexer.COLON]: "punctuation",
  [ANTLRv4Lexer.COLONCOLON]: "punctuation",
  [ANTLRv4Lexer.COMMA]: "punctuation",
  [ANTLRv4Lexer.SEMI]: "punctuation",
  [ANTLRv4Lexer.LPAREN]: "paren",
  [ANTLRv4Lexer.RPAREN]: "paren",
  [ANTLRv4Lexer.RBRACE]: "brace",
  [ANTLRv4Lexer.RARROW]: "operator",
  [ANTLRv4Lexer.LT]: "operator",
  [ANTLRv4Lexer.GT]: "operator",
  [ANTLRv4Lexer.ASSIGN]: "operator",
  [ANTLRv4Lexer.QUESTION]: "operator",
  [ANTLRv4Lexer.STAR]: "operator",
  [ANTLRv4Lexer.PLUS_ASSIGN]: "operator",
  [ANTLRv4Lexer.PLUS]: "operator",
  [ANTLRv4Lexer.OR]: "operator",
  [ANTLRv4Lexer.DOLLAR]: "operator",
  [ANTLRv4Lexer.RANGE]: "operator",
  [ANTLRv4Lexer.DOT]: "operator",
  [ANTLRv4Lexer.AT]: "meta",
  [ANTLRv4Lexer.POUND]: "meta",
  [ANTLRv4Lexer.NOT]: "operator",
  [ANTLRv4Lexer.ID]: "variableName",
};

const antlrStreamParser: StreamParser<null> = {
  startState() {
    return null;
  },

  token(stream) {
    // Create a new lexer for the entire stream content
    // @ts-ignore
    const lexer = new ANTLRv4Lexer(new InputStream(stream.string));
    let token;

    // Advance the lexer until the stream's current position
    while ((token = lexer.nextToken()).type !== Token.EOF) {
      if (token.start >= stream.pos) {
        break;
      }
    }

    // If we found a token at the current position, style it
    if (token && token.start === stream.pos) {
      // Advance the stream by the length of the token
      stream.pos += token.text?.length || 0;
      return tokenTypeToClass[token.type] || null;
    }

    // If no token is found at the current position, advance the stream by one character
    stream.next();
    return null;
  },
};

export const antlrLanguage = StreamLanguage.define(antlrStreamParser);
