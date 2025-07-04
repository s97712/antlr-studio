import antlr4 from 'antlr4';
import ANTLRv4Lexer from '../generated/ANTLRv4Lexer';
import { tags } from '@lezer/highlight';
import { StreamLanguage, type StreamParser } from '@codemirror/language';
import type { Tag } from '@lezer/highlight';

interface TokenInfo {
  tokenName: string;
  text: string;
  type: number;
  startIndex: number;
  stopIndex: number;
}

interface AntlrStreamState {
  inBlockComment: boolean;
  // We could add more state here if needed, e.g., for multi-line strings
}

const tokenCache = new Map<string, TokenInfo[]>();

function getTokensForText(text: string): TokenInfo[] {
  if (tokenCache.has(text)) {
    return tokenCache.get(text)!;
  }

  const chars = new antlr4.CharStream(text);
  const lexer = new ANTLRv4Lexer(chars);
  
  const allTokens: any[] = [];
  let token = lexer.nextToken();
  while (token.type !== antlr4.Token.EOF) {
    allTokens.push(token);
    token = lexer.nextToken();
  }

  const tokens = allTokens.map((token: any) => {
    return {
      tokenName: (ANTLRv4Lexer as any).symbolicNames[token.type] || '',
      text: token.text || '',
      type: token.type,
      startIndex: token.start,
      stopIndex: token.stop,
    };
  });

  tokenCache.set(text, tokens);
  return tokens;
}

function getStyleNameByTag(tag: Tag): string {
  for (const t in tags) {
    if ((tags as any)[t] === tag) {
      return t;
    }
  }
  return '';
}

const antlrStreamParser: StreamParser<AntlrStreamState> = {
  startState: (): AntlrStreamState => {
    return {
      inBlockComment: false,
    };
  },

  token: (stream, state) => {
    if (state.inBlockComment) {
      // We are inside a block comment, look for the closing tag
      const closingMatch = stream.match(/.*?\*\//);
      if (closingMatch) {
        state.inBlockComment = false; // End of comment
      } else {
        stream.skipToEnd(); // The rest of the line is a comment
      }
      return getStyleNameByTag(tags.blockComment);
    }

    // If not in a block comment, get tokens for the current line
    const tokens = getTokensForText(stream.string);
    const nextToken = tokens.find((t) => t.startIndex >= stream.pos);

    if (nextToken && nextToken.text && stream.match(nextToken.text)) {
      if (nextToken.type === ANTLRv4Lexer.BLOCK_COMMENT) {
        if (!nextToken.text.endsWith('*/')) {
          state.inBlockComment = true;
        }
      }
      
      switch (nextToken.type) {
        case ANTLRv4Lexer.DOC_COMMENT:
        case ANTLRv4Lexer.BLOCK_COMMENT:
        case ANTLRv4Lexer.LINE_COMMENT:
          return getStyleNameByTag(tags.comment);
        case ANTLRv4Lexer.STRING_LITERAL:
          return getStyleNameByTag(tags.string);
        case ANTLRv4Lexer.INT:
          return getStyleNameByTag(tags.number);
        case ANTLRv4Lexer.LEXER:
        case ANTLRv4Lexer.PARSER:
        case ANTLRv4Lexer.GRAMMAR:
        case ANTLRv4Lexer.IMPORT:
        case ANTLRv4Lexer.FRAGMENT:
        case ANTLRv4Lexer.MODE:
        case ANTLRv4Lexer.RETURNS:
        case ANTLRv4Lexer.LOCALS:
        case ANTLRv4Lexer.THROWS:
        case ANTLRv4Lexer.CATCH:
        case ANTLRv4Lexer.FINALLY:
        case ANTLRv4Lexer.OPTIONS:
        case ANTLRv4Lexer.TOKENS:
        case ANTLRv4Lexer.CHANNELS:
          return getStyleNameByTag(tags.keyword);
        case ANTLRv4Lexer.TOKEN_REF:
          return getStyleNameByTag(tags.typeName);
        case ANTLRv4Lexer.RULE_REF:
          return getStyleNameByTag(tags.variableName);
        default:
          return null;
      }
    }

    stream.next();
    return null;
  },

  copyState: (state: AntlrStreamState): AntlrStreamState => {
    return { ...state };
  }
};

export const antlrLanguage = StreamLanguage.define(antlrStreamParser);
