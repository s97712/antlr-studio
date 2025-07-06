// Generated from apps/web/src/grammar/grammars/ANTLRv4Parser.g4 by ANTLR 4.13.1
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import ANTLRv4ParserListener from "./ANTLRv4ParserListener.js";
import ANTLRv4ParserVisitor from "./ANTLRv4ParserVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class ANTLRv4Parser extends Parser {
	public static readonly ACTION = 4;
	public static readonly ARG_ACTION = 5;
	public static readonly ARG_OR_CHARSET = 6;
	public static readonly ASSIGN = 7;
	public static readonly LEXER_CHAR_SET = 8;
	public static readonly RULE_REF = 9;
	public static readonly SEMPRED = 10;
	public static readonly STRING_LITERAL = 11;
	public static readonly TOKEN_REF = 13;
	public static readonly UNICODE_ESC = 14;
	public static readonly UNICODE_EXTENDED_ESC = 15;
	public static readonly WS = 16;
	public static readonly ALT = 17;
	public static readonly BLOCK = 18;
	public static readonly CLOSURE = 19;
	public static readonly ELEMENT_OPTIONS = 20;
	public static readonly EPSILON = 21;
	public static readonly LEXER_ACTION_CALL = 22;
	public static readonly LEXER_ALT_ACTION = 23;
	public static readonly OPTIONAL = 24;
	public static readonly POSITIVE_CLOSURE = 25;
	public static readonly RULE = 26;
	public static readonly RULEMODIFIERS = 27;
	public static readonly RULES = 28;
	public static readonly SET = 29;
	public static readonly WILDCARD = 30;
	public static readonly DOC_COMMENT = 31;
	public static readonly BLOCK_COMMENT = 32;
	public static readonly LINE_COMMENT = 33;
	public static readonly INT = 34;
	public static readonly UNTERMINATED_STRING_LITERAL = 35;
	public static readonly BEGIN_ARGUMENT = 36;
	public static readonly OPTIONS = 37;
	public static readonly TOKENS = 38;
	public static readonly CHANNELS = 39;
	public static readonly IMPORT = 40;
	public static readonly FRAGMENT = 41;
	public static readonly LEXER = 42;
	public static readonly PARSER = 43;
	public static readonly GRAMMAR = 44;
	public static readonly PROTECTED = 45;
	public static readonly PUBLIC = 46;
	public static readonly PRIVATE = 47;
	public static readonly RETURNS = 48;
	public static readonly LOCALS = 49;
	public static readonly THROWS = 50;
	public static readonly CATCH = 51;
	public static readonly FINALLY = 52;
	public static readonly MODE = 53;
	public static readonly COLON = 54;
	public static readonly COLONCOLON = 55;
	public static readonly COMMA = 56;
	public static readonly SEMI = 57;
	public static readonly LPAREN = 58;
	public static readonly RPAREN = 59;
	public static readonly RBRACE = 60;
	public static readonly RARROW = 61;
	public static readonly LT = 62;
	public static readonly GT = 63;
	public static readonly QUESTION = 64;
	public static readonly STAR = 65;
	public static readonly PLUS_ASSIGN = 66;
	public static readonly PLUS = 67;
	public static readonly OR = 68;
	public static readonly DOLLAR = 69;
	public static readonly RANGE = 70;
	public static readonly DOT = 71;
	public static readonly AT = 72;
	public static readonly POUND = 73;
	public static readonly NOT = 74;
	public static readonly ID = 75;
	public static readonly END_ARGUMENT = 76;
	public static readonly UNTERMINATED_ARGUMENT = 77;
	public static readonly ARGUMENT_CONTENT = 78;
	public static readonly UNTERMINATED_CHAR_SET = 79;
	public static readonly EOF = Token.EOF;
	public static readonly RULE_grammarSpec = 0;
	public static readonly RULE_grammarDecl = 1;
	public static readonly RULE_grammarType = 2;
	public static readonly RULE_prequelConstruct = 3;
	public static readonly RULE_optionsSpec = 4;
	public static readonly RULE_option = 5;
	public static readonly RULE_optionValue = 6;
	public static readonly RULE_delegateGrammars = 7;
	public static readonly RULE_delegateGrammar = 8;
	public static readonly RULE_tokensSpec = 9;
	public static readonly RULE_channelsSpec = 10;
	public static readonly RULE_idList = 11;
	public static readonly RULE_action_ = 12;
	public static readonly RULE_actionScopeName = 13;
	public static readonly RULE_actionBlock = 14;
	public static readonly RULE_argActionBlock = 15;
	public static readonly RULE_modeSpec = 16;
	public static readonly RULE_rules = 17;
	public static readonly RULE_ruleSpec = 18;
	public static readonly RULE_parserRuleSpec = 19;
	public static readonly RULE_exceptionGroup = 20;
	public static readonly RULE_exceptionHandler = 21;
	public static readonly RULE_finallyClause = 22;
	public static readonly RULE_rulePrequel = 23;
	public static readonly RULE_ruleReturns = 24;
	public static readonly RULE_throwsSpec = 25;
	public static readonly RULE_localsSpec = 26;
	public static readonly RULE_ruleAction = 27;
	public static readonly RULE_ruleModifiers = 28;
	public static readonly RULE_ruleModifier = 29;
	public static readonly RULE_ruleBlock = 30;
	public static readonly RULE_ruleAltList = 31;
	public static readonly RULE_labeledAlt = 32;
	public static readonly RULE_lexerRuleSpec = 33;
	public static readonly RULE_lexerRuleBlock = 34;
	public static readonly RULE_lexerAltList = 35;
	public static readonly RULE_lexerAlt = 36;
	public static readonly RULE_lexerElements = 37;
	public static readonly RULE_lexerElement = 38;
	public static readonly RULE_lexerBlock = 39;
	public static readonly RULE_lexerCommands = 40;
	public static readonly RULE_lexerCommand = 41;
	public static readonly RULE_lexerCommandName = 42;
	public static readonly RULE_lexerCommandExpr = 43;
	public static readonly RULE_altList = 44;
	public static readonly RULE_alternative = 45;
	public static readonly RULE_element = 46;
	public static readonly RULE_predicateOptions = 47;
	public static readonly RULE_predicateOption = 48;
	public static readonly RULE_labeledElement = 49;
	public static readonly RULE_ebnf = 50;
	public static readonly RULE_blockSuffix = 51;
	public static readonly RULE_ebnfSuffix = 52;
	public static readonly RULE_lexerAtom = 53;
	public static readonly RULE_atom = 54;
	public static readonly RULE_wildcard = 55;
	public static readonly RULE_notSet = 56;
	public static readonly RULE_blockSet = 57;
	public static readonly RULE_setElement = 58;
	public static readonly RULE_block = 59;
	public static readonly RULE_ruleref = 60;
	public static readonly RULE_characterRange = 61;
	public static readonly RULE_terminalDef = 62;
	public static readonly RULE_elementOptions = 63;
	public static readonly RULE_elementOption = 64;
	public static readonly RULE_identifier = 65;
	public static readonly RULE_qualifiedIdentifier = 66;
	public static readonly literalNames: (string | null)[] = [ null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, "'='", 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            null, null, 
                                                            "'['", null, 
                                                            null, null, 
                                                            "'import'", 
                                                            "'fragment'", 
                                                            "'lexer'", "'parser'", 
                                                            "'grammar'", 
                                                            "'protected'", 
                                                            "'public'", 
                                                            "'private'", 
                                                            "'returns'", 
                                                            "'locals'", 
                                                            "'throws'", 
                                                            "'catch'", "'finally'", 
                                                            "'mode'", "':'", 
                                                            "'::'", "','", 
                                                            "';'", "'('", 
                                                            "')'", "'}'", 
                                                            "'->'", "'<'", 
                                                            "'>'", "'?'", 
                                                            "'*'", "'+='", 
                                                            "'+'", "'|'", 
                                                            "'$'", "'..'", 
                                                            "'.'", "'@'", 
                                                            "'#'", "'~'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, null, 
                                                             null, null, 
                                                             "ACTION", "ARG_ACTION", 
                                                             "ARG_OR_CHARSET", 
                                                             "ASSIGN", "LEXER_CHAR_SET", 
                                                             "RULE_REF", 
                                                             "SEMPRED", 
                                                             "STRING_LITERAL", 
                                                             null, "TOKEN_REF", 
                                                             "UNICODE_ESC", 
                                                             "UNICODE_EXTENDED_ESC", 
                                                             "WS", "ALT", 
                                                             "BLOCK", "CLOSURE", 
                                                             "ELEMENT_OPTIONS", 
                                                             "EPSILON", 
                                                             "LEXER_ACTION_CALL", 
                                                             "LEXER_ALT_ACTION", 
                                                             "OPTIONAL", 
                                                             "POSITIVE_CLOSURE", 
                                                             "RULE", "RULEMODIFIERS", 
                                                             "RULES", "SET", 
                                                             "WILDCARD", 
                                                             "DOC_COMMENT", 
                                                             "BLOCK_COMMENT", 
                                                             "LINE_COMMENT", 
                                                             "INT", "UNTERMINATED_STRING_LITERAL", 
                                                             "BEGIN_ARGUMENT", 
                                                             "OPTIONS", 
                                                             "TOKENS", "CHANNELS", 
                                                             "IMPORT", "FRAGMENT", 
                                                             "LEXER", "PARSER", 
                                                             "GRAMMAR", 
                                                             "PROTECTED", 
                                                             "PUBLIC", "PRIVATE", 
                                                             "RETURNS", 
                                                             "LOCALS", "THROWS", 
                                                             "CATCH", "FINALLY", 
                                                             "MODE", "COLON", 
                                                             "COLONCOLON", 
                                                             "COMMA", "SEMI", 
                                                             "LPAREN", "RPAREN", 
                                                             "RBRACE", "RARROW", 
                                                             "LT", "GT", 
                                                             "QUESTION", 
                                                             "STAR", "PLUS_ASSIGN", 
                                                             "PLUS", "OR", 
                                                             "DOLLAR", "RANGE", 
                                                             "DOT", "AT", 
                                                             "POUND", "NOT", 
                                                             "ID", "END_ARGUMENT", 
                                                             "UNTERMINATED_ARGUMENT", 
                                                             "ARGUMENT_CONTENT", 
                                                             "UNTERMINATED_CHAR_SET" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"grammarSpec", "grammarDecl", "grammarType", "prequelConstruct", "optionsSpec", 
		"option", "optionValue", "delegateGrammars", "delegateGrammar", "tokensSpec", 
		"channelsSpec", "idList", "action_", "actionScopeName", "actionBlock", 
		"argActionBlock", "modeSpec", "rules", "ruleSpec", "parserRuleSpec", "exceptionGroup", 
		"exceptionHandler", "finallyClause", "rulePrequel", "ruleReturns", "throwsSpec", 
		"localsSpec", "ruleAction", "ruleModifiers", "ruleModifier", "ruleBlock", 
		"ruleAltList", "labeledAlt", "lexerRuleSpec", "lexerRuleBlock", "lexerAltList", 
		"lexerAlt", "lexerElements", "lexerElement", "lexerBlock", "lexerCommands", 
		"lexerCommand", "lexerCommandName", "lexerCommandExpr", "altList", "alternative", 
		"element", "predicateOptions", "predicateOption", "labeledElement", "ebnf", 
		"blockSuffix", "ebnfSuffix", "lexerAtom", "atom", "wildcard", "notSet", 
		"blockSet", "setElement", "block", "ruleref", "characterRange", "terminalDef", 
		"elementOptions", "elementOption", "identifier", "qualifiedIdentifier",
	];
	public get grammarFileName(): string { return "ANTLRv4Parser.g4"; }
	public get literalNames(): (string | null)[] { return ANTLRv4Parser.literalNames; }
	public get symbolicNames(): (string | null)[] { return ANTLRv4Parser.symbolicNames; }
	public get ruleNames(): string[] { return ANTLRv4Parser.ruleNames; }
	public get serializedATN(): number[] { return ANTLRv4Parser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, ANTLRv4Parser._ATN, ANTLRv4Parser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public grammarSpec(): GrammarSpecContext {
		let localctx: GrammarSpecContext = new GrammarSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, ANTLRv4Parser.RULE_grammarSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 134;
			this.grammarDecl();
			this.state = 138;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (((((_la - 37)) & ~0x1F) === 0 && ((1 << (_la - 37)) & 15) !== 0) || _la===72) {
				{
				{
				this.state = 135;
				this.prequelConstruct();
				}
				}
				this.state = 140;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 141;
			this.rules();
			this.state = 145;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===53) {
				{
				{
				this.state = 142;
				this.modeSpec();
				}
				}
				this.state = 147;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 148;
			this.match(ANTLRv4Parser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public grammarDecl(): GrammarDeclContext {
		let localctx: GrammarDeclContext = new GrammarDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, ANTLRv4Parser.RULE_grammarDecl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 150;
			this.grammarType();
			this.state = 151;
			this.identifier();
			this.state = 152;
			this.match(ANTLRv4Parser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public grammarType(): GrammarTypeContext {
		let localctx: GrammarTypeContext = new GrammarTypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, ANTLRv4Parser.RULE_grammarType);
		try {
			this.state = 159;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 42:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 154;
				this.match(ANTLRv4Parser.LEXER);
				this.state = 155;
				this.match(ANTLRv4Parser.GRAMMAR);
				}
				break;
			case 43:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 156;
				this.match(ANTLRv4Parser.PARSER);
				this.state = 157;
				this.match(ANTLRv4Parser.GRAMMAR);
				}
				break;
			case 44:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 158;
				this.match(ANTLRv4Parser.GRAMMAR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public prequelConstruct(): PrequelConstructContext {
		let localctx: PrequelConstructContext = new PrequelConstructContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, ANTLRv4Parser.RULE_prequelConstruct);
		try {
			this.state = 166;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 37:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 161;
				this.optionsSpec();
				}
				break;
			case 40:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 162;
				this.delegateGrammars();
				}
				break;
			case 38:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 163;
				this.tokensSpec();
				}
				break;
			case 39:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 164;
				this.channelsSpec();
				}
				break;
			case 72:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 165;
				this.action_();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public optionsSpec(): OptionsSpecContext {
		let localctx: OptionsSpecContext = new OptionsSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, ANTLRv4Parser.RULE_optionsSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 168;
			this.match(ANTLRv4Parser.OPTIONS);
			this.state = 174;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===9 || _la===13) {
				{
				{
				this.state = 169;
				this.option();
				this.state = 170;
				this.match(ANTLRv4Parser.SEMI);
				}
				}
				this.state = 176;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 177;
			this.match(ANTLRv4Parser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public option(): OptionContext {
		let localctx: OptionContext = new OptionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, ANTLRv4Parser.RULE_option);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 179;
			this.identifier();
			this.state = 180;
			this.match(ANTLRv4Parser.ASSIGN);
			this.state = 181;
			this.optionValue();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public optionValue(): OptionValueContext {
		let localctx: OptionValueContext = new OptionValueContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, ANTLRv4Parser.RULE_optionValue);
		let _la: number;
		try {
			this.state = 194;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 13:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 183;
				this.identifier();
				this.state = 188;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===71) {
					{
					{
					this.state = 184;
					this.match(ANTLRv4Parser.DOT);
					this.state = 185;
					this.identifier();
					}
					}
					this.state = 190;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 191;
				this.match(ANTLRv4Parser.STRING_LITERAL);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 192;
				this.actionBlock();
				}
				break;
			case 34:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 193;
				this.match(ANTLRv4Parser.INT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public delegateGrammars(): DelegateGrammarsContext {
		let localctx: DelegateGrammarsContext = new DelegateGrammarsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, ANTLRv4Parser.RULE_delegateGrammars);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 196;
			this.match(ANTLRv4Parser.IMPORT);
			this.state = 197;
			this.delegateGrammar();
			this.state = 202;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===56) {
				{
				{
				this.state = 198;
				this.match(ANTLRv4Parser.COMMA);
				this.state = 199;
				this.delegateGrammar();
				}
				}
				this.state = 204;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 205;
			this.match(ANTLRv4Parser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public delegateGrammar(): DelegateGrammarContext {
		let localctx: DelegateGrammarContext = new DelegateGrammarContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, ANTLRv4Parser.RULE_delegateGrammar);
		try {
			this.state = 212;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 8, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 207;
				this.identifier();
				this.state = 208;
				this.match(ANTLRv4Parser.ASSIGN);
				this.state = 209;
				this.identifier();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 211;
				this.identifier();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public tokensSpec(): TokensSpecContext {
		let localctx: TokensSpecContext = new TokensSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, ANTLRv4Parser.RULE_tokensSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 214;
			this.match(ANTLRv4Parser.TOKENS);
			this.state = 216;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9 || _la===13) {
				{
				this.state = 215;
				this.idList();
				}
			}

			this.state = 218;
			this.match(ANTLRv4Parser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public channelsSpec(): ChannelsSpecContext {
		let localctx: ChannelsSpecContext = new ChannelsSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, ANTLRv4Parser.RULE_channelsSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 220;
			this.match(ANTLRv4Parser.CHANNELS);
			this.state = 222;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===9 || _la===13) {
				{
				this.state = 221;
				this.idList();
				}
			}

			this.state = 224;
			this.match(ANTLRv4Parser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public idList(): IdListContext {
		let localctx: IdListContext = new IdListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, ANTLRv4Parser.RULE_idList);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 226;
			this.identifier();
			this.state = 231;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 227;
					this.match(ANTLRv4Parser.COMMA);
					this.state = 228;
					this.identifier();
					}
					}
				}
				this.state = 233;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 11, this._ctx);
			}
			this.state = 235;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===56) {
				{
				this.state = 234;
				this.match(ANTLRv4Parser.COMMA);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public action_(): Action_Context {
		let localctx: Action_Context = new Action_Context(this, this._ctx, this.state);
		this.enterRule(localctx, 24, ANTLRv4Parser.RULE_action_);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 237;
			this.match(ANTLRv4Parser.AT);
			this.state = 241;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				{
				this.state = 238;
				this.actionScopeName();
				this.state = 239;
				this.match(ANTLRv4Parser.COLONCOLON);
				}
				break;
			}
			this.state = 243;
			this.identifier();
			this.state = 244;
			this.actionBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public actionScopeName(): ActionScopeNameContext {
		let localctx: ActionScopeNameContext = new ActionScopeNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 26, ANTLRv4Parser.RULE_actionScopeName);
		try {
			this.state = 249;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 13:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 246;
				this.identifier();
				}
				break;
			case 42:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 247;
				this.match(ANTLRv4Parser.LEXER);
				}
				break;
			case 43:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 248;
				this.match(ANTLRv4Parser.PARSER);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public actionBlock(): ActionBlockContext {
		let localctx: ActionBlockContext = new ActionBlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, ANTLRv4Parser.RULE_actionBlock);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 251;
			this.match(ANTLRv4Parser.ACTION);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public argActionBlock(): ArgActionBlockContext {
		let localctx: ArgActionBlockContext = new ArgActionBlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 30, ANTLRv4Parser.RULE_argActionBlock);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 253;
			this.match(ANTLRv4Parser.BEGIN_ARGUMENT);
			this.state = 257;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
			while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1 + 1) {
					{
					{
					this.state = 254;
					this.match(ANTLRv4Parser.ARGUMENT_CONTENT);
					}
					}
				}
				this.state = 259;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 15, this._ctx);
			}
			this.state = 260;
			this.match(ANTLRv4Parser.END_ARGUMENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public modeSpec(): ModeSpecContext {
		let localctx: ModeSpecContext = new ModeSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 32, ANTLRv4Parser.RULE_modeSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 262;
			this.match(ANTLRv4Parser.MODE);
			this.state = 263;
			this.identifier();
			this.state = 264;
			this.match(ANTLRv4Parser.SEMI);
			this.state = 268;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===13 || _la===41) {
				{
				{
				this.state = 265;
				this.lexerRuleSpec();
				}
				}
				this.state = 270;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public rules(): RulesContext {
		let localctx: RulesContext = new RulesContext(this, this._ctx, this.state);
		this.enterRule(localctx, 34, ANTLRv4Parser.RULE_rules);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 274;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===9 || _la===13 || ((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 113) !== 0)) {
				{
				{
				this.state = 271;
				this.ruleSpec();
				}
				}
				this.state = 276;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ruleSpec(): RuleSpecContext {
		let localctx: RuleSpecContext = new RuleSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 36, ANTLRv4Parser.RULE_ruleSpec);
		try {
			this.state = 279;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 18, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 277;
				this.parserRuleSpec();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 278;
				this.lexerRuleSpec();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public parserRuleSpec(): ParserRuleSpecContext {
		let localctx: ParserRuleSpecContext = new ParserRuleSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 38, ANTLRv4Parser.RULE_parserRuleSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 282;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 113) !== 0)) {
				{
				this.state = 281;
				this.ruleModifiers();
				}
			}

			this.state = 284;
			this.match(ANTLRv4Parser.RULE_REF);
			this.state = 286;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===36) {
				{
				this.state = 285;
				this.argActionBlock();
				}
			}

			this.state = 289;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===48) {
				{
				this.state = 288;
				this.ruleReturns();
				}
			}

			this.state = 292;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===50) {
				{
				this.state = 291;
				this.throwsSpec();
				}
			}

			this.state = 295;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===49) {
				{
				this.state = 294;
				this.localsSpec();
				}
			}

			this.state = 300;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===37 || _la===72) {
				{
				{
				this.state = 297;
				this.rulePrequel();
				}
				}
				this.state = 302;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 303;
			this.match(ANTLRv4Parser.COLON);
			this.state = 304;
			this.ruleBlock();
			this.state = 305;
			this.match(ANTLRv4Parser.SEMI);
			this.state = 306;
			this.exceptionGroup();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public exceptionGroup(): ExceptionGroupContext {
		let localctx: ExceptionGroupContext = new ExceptionGroupContext(this, this._ctx, this.state);
		this.enterRule(localctx, 40, ANTLRv4Parser.RULE_exceptionGroup);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 311;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===51) {
				{
				{
				this.state = 308;
				this.exceptionHandler();
				}
				}
				this.state = 313;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 315;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===52) {
				{
				this.state = 314;
				this.finallyClause();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public exceptionHandler(): ExceptionHandlerContext {
		let localctx: ExceptionHandlerContext = new ExceptionHandlerContext(this, this._ctx, this.state);
		this.enterRule(localctx, 42, ANTLRv4Parser.RULE_exceptionHandler);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 317;
			this.match(ANTLRv4Parser.CATCH);
			this.state = 318;
			this.argActionBlock();
			this.state = 319;
			this.actionBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public finallyClause(): FinallyClauseContext {
		let localctx: FinallyClauseContext = new FinallyClauseContext(this, this._ctx, this.state);
		this.enterRule(localctx, 44, ANTLRv4Parser.RULE_finallyClause);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 321;
			this.match(ANTLRv4Parser.FINALLY);
			this.state = 322;
			this.actionBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public rulePrequel(): RulePrequelContext {
		let localctx: RulePrequelContext = new RulePrequelContext(this, this._ctx, this.state);
		this.enterRule(localctx, 46, ANTLRv4Parser.RULE_rulePrequel);
		try {
			this.state = 326;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 37:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 324;
				this.optionsSpec();
				}
				break;
			case 72:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 325;
				this.ruleAction();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ruleReturns(): RuleReturnsContext {
		let localctx: RuleReturnsContext = new RuleReturnsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 48, ANTLRv4Parser.RULE_ruleReturns);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 328;
			this.match(ANTLRv4Parser.RETURNS);
			this.state = 329;
			this.argActionBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public throwsSpec(): ThrowsSpecContext {
		let localctx: ThrowsSpecContext = new ThrowsSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 50, ANTLRv4Parser.RULE_throwsSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 331;
			this.match(ANTLRv4Parser.THROWS);
			this.state = 332;
			this.qualifiedIdentifier();
			this.state = 337;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===56) {
				{
				{
				this.state = 333;
				this.match(ANTLRv4Parser.COMMA);
				this.state = 334;
				this.qualifiedIdentifier();
				}
				}
				this.state = 339;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public localsSpec(): LocalsSpecContext {
		let localctx: LocalsSpecContext = new LocalsSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 52, ANTLRv4Parser.RULE_localsSpec);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 340;
			this.match(ANTLRv4Parser.LOCALS);
			this.state = 341;
			this.argActionBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ruleAction(): RuleActionContext {
		let localctx: RuleActionContext = new RuleActionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 54, ANTLRv4Parser.RULE_ruleAction);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 343;
			this.match(ANTLRv4Parser.AT);
			this.state = 344;
			this.identifier();
			this.state = 345;
			this.actionBlock();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ruleModifiers(): RuleModifiersContext {
		let localctx: RuleModifiersContext = new RuleModifiersContext(this, this._ctx, this.state);
		this.enterRule(localctx, 56, ANTLRv4Parser.RULE_ruleModifiers);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 348;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 347;
				this.ruleModifier();
				}
				}
				this.state = 350;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 113) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ruleModifier(): RuleModifierContext {
		let localctx: RuleModifierContext = new RuleModifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 58, ANTLRv4Parser.RULE_ruleModifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 352;
			_la = this._input.LA(1);
			if(!(((((_la - 41)) & ~0x1F) === 0 && ((1 << (_la - 41)) & 113) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ruleBlock(): RuleBlockContext {
		let localctx: RuleBlockContext = new RuleBlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 60, ANTLRv4Parser.RULE_ruleBlock);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 354;
			this.ruleAltList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ruleAltList(): RuleAltListContext {
		let localctx: RuleAltListContext = new RuleAltListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 62, ANTLRv4Parser.RULE_ruleAltList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 356;
			this.labeledAlt();
			this.state = 361;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===68) {
				{
				{
				this.state = 357;
				this.match(ANTLRv4Parser.OR);
				this.state = 358;
				this.labeledAlt();
				}
				}
				this.state = 363;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public labeledAlt(): LabeledAltContext {
		let localctx: LabeledAltContext = new LabeledAltContext(this, this._ctx, this.state);
		this.enterRule(localctx, 64, ANTLRv4Parser.RULE_labeledAlt);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 364;
			this.alternative();
			this.state = 367;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===73) {
				{
				this.state = 365;
				this.match(ANTLRv4Parser.POUND);
				this.state = 366;
				this.identifier();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lexerRuleSpec(): LexerRuleSpecContext {
		let localctx: LexerRuleSpecContext = new LexerRuleSpecContext(this, this._ctx, this.state);
		this.enterRule(localctx, 66, ANTLRv4Parser.RULE_lexerRuleSpec);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 370;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===41) {
				{
				this.state = 369;
				this.match(ANTLRv4Parser.FRAGMENT);
				}
			}

			this.state = 372;
			this.match(ANTLRv4Parser.TOKEN_REF);
			this.state = 374;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===37) {
				{
				this.state = 373;
				this.optionsSpec();
				}
			}

			this.state = 376;
			this.match(ANTLRv4Parser.COLON);
			this.state = 377;
			this.lexerRuleBlock();
			this.state = 378;
			this.match(ANTLRv4Parser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lexerRuleBlock(): LexerRuleBlockContext {
		let localctx: LexerRuleBlockContext = new LexerRuleBlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 68, ANTLRv4Parser.RULE_lexerRuleBlock);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 380;
			this.lexerAltList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lexerAltList(): LexerAltListContext {
		let localctx: LexerAltListContext = new LexerAltListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 70, ANTLRv4Parser.RULE_lexerAltList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 382;
			this.lexerAlt();
			this.state = 387;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===68) {
				{
				{
				this.state = 383;
				this.match(ANTLRv4Parser.OR);
				this.state = 384;
				this.lexerAlt();
				}
				}
				this.state = 389;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lexerAlt(): LexerAltContext {
		let localctx: LexerAltContext = new LexerAltContext(this, this._ctx, this.state);
		this.enterRule(localctx, 72, ANTLRv4Parser.RULE_lexerAlt);
		let _la: number;
		try {
			this.state = 395;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 390;
				this.lexerElements();
				this.state = 392;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===61) {
					{
					this.state = 391;
					this.lexerCommands();
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lexerElements(): LexerElementsContext {
		let localctx: LexerElementsContext = new LexerElementsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 74, ANTLRv4Parser.RULE_lexerElements);
		let _la: number;
		try {
			this.state = 403;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 8:
			case 11:
			case 13:
			case 58:
			case 71:
			case 74:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 398;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 397;
					this.lexerElement();
					}
					}
					this.state = 400;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 10512) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 73729) !== 0));
				}
				break;
			case 57:
			case 59:
			case 61:
			case 68:
				this.enterOuterAlt(localctx, 2);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lexerElement(): LexerElementContext {
		let localctx: LexerElementContext = new LexerElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 76, ANTLRv4Parser.RULE_lexerElement);
		let _la: number;
		try {
			this.state = 417;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 8:
			case 11:
			case 13:
			case 71:
			case 74:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 405;
				this.lexerAtom();
				this.state = 407;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 11) !== 0)) {
					{
					this.state = 406;
					this.ebnfSuffix();
					}
				}

				}
				break;
			case 58:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 409;
				this.lexerBlock();
				this.state = 411;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 11) !== 0)) {
					{
					this.state = 410;
					this.ebnfSuffix();
					}
				}

				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 413;
				this.actionBlock();
				this.state = 415;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===64) {
					{
					this.state = 414;
					this.match(ANTLRv4Parser.QUESTION);
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lexerBlock(): LexerBlockContext {
		let localctx: LexerBlockContext = new LexerBlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 78, ANTLRv4Parser.RULE_lexerBlock);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 419;
			this.match(ANTLRv4Parser.LPAREN);
			this.state = 420;
			this.lexerAltList();
			this.state = 421;
			this.match(ANTLRv4Parser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lexerCommands(): LexerCommandsContext {
		let localctx: LexerCommandsContext = new LexerCommandsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 80, ANTLRv4Parser.RULE_lexerCommands);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 423;
			this.match(ANTLRv4Parser.RARROW);
			this.state = 424;
			this.lexerCommand();
			this.state = 429;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===56) {
				{
				{
				this.state = 425;
				this.match(ANTLRv4Parser.COMMA);
				this.state = 426;
				this.lexerCommand();
				}
				}
				this.state = 431;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lexerCommand(): LexerCommandContext {
		let localctx: LexerCommandContext = new LexerCommandContext(this, this._ctx, this.state);
		this.enterRule(localctx, 82, ANTLRv4Parser.RULE_lexerCommand);
		try {
			this.state = 438;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 44, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 432;
				this.lexerCommandName();
				this.state = 433;
				this.match(ANTLRv4Parser.LPAREN);
				this.state = 434;
				this.lexerCommandExpr();
				this.state = 435;
				this.match(ANTLRv4Parser.RPAREN);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 437;
				this.lexerCommandName();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lexerCommandName(): LexerCommandNameContext {
		let localctx: LexerCommandNameContext = new LexerCommandNameContext(this, this._ctx, this.state);
		this.enterRule(localctx, 84, ANTLRv4Parser.RULE_lexerCommandName);
		try {
			this.state = 442;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 13:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 440;
				this.identifier();
				}
				break;
			case 53:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 441;
				this.match(ANTLRv4Parser.MODE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lexerCommandExpr(): LexerCommandExprContext {
		let localctx: LexerCommandExprContext = new LexerCommandExprContext(this, this._ctx, this.state);
		this.enterRule(localctx, 86, ANTLRv4Parser.RULE_lexerCommandExpr);
		try {
			this.state = 446;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 13:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 444;
				this.identifier();
				}
				break;
			case 34:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 445;
				this.match(ANTLRv4Parser.INT);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public altList(): AltListContext {
		let localctx: AltListContext = new AltListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 88, ANTLRv4Parser.RULE_altList);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 448;
			this.alternative();
			this.state = 453;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===68) {
				{
				{
				this.state = 449;
				this.match(ANTLRv4Parser.OR);
				this.state = 450;
				this.alternative();
				}
				}
				this.state = 455;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public alternative(): AlternativeContext {
		let localctx: AlternativeContext = new AlternativeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 90, ANTLRv4Parser.RULE_alternative);
		let _la: number;
		try {
			this.state = 465;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 4:
			case 9:
			case 11:
			case 13:
			case 58:
			case 62:
			case 71:
			case 74:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 457;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===62) {
					{
					this.state = 456;
					this.elementOptions();
					}
				}

				this.state = 460;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 459;
					this.element();
					}
					}
					this.state = 462;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 10768) !== 0) || ((((_la - 58)) & ~0x1F) === 0 && ((1 << (_la - 58)) & 73729) !== 0));
				}
				break;
			case 57:
			case 59:
			case 68:
			case 73:
				this.enterOuterAlt(localctx, 2);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public element(): ElementContext {
		let localctx: ElementContext = new ElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 92, ANTLRv4Parser.RULE_element);
		let _la: number;
		try {
			this.state = 485;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 55, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 467;
				this.labeledElement();
				this.state = 470;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 64:
				case 65:
				case 67:
					{
					this.state = 468;
					this.ebnfSuffix();
					}
					break;
				case 4:
				case 9:
				case 11:
				case 13:
				case 57:
				case 58:
				case 59:
				case 68:
				case 71:
				case 73:
				case 74:
					// tslint:disable-next-line:no-empty
					{
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 472;
				this.atom();
				this.state = 475;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 64:
				case 65:
				case 67:
					{
					this.state = 473;
					this.ebnfSuffix();
					}
					break;
				case 4:
				case 9:
				case 11:
				case 13:
				case 57:
				case 58:
				case 59:
				case 68:
				case 71:
				case 73:
				case 74:
					// tslint:disable-next-line:no-empty
					{
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 477;
				this.ebnf();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 478;
				this.actionBlock();
				this.state = 480;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===64) {
					{
					this.state = 479;
					this.match(ANTLRv4Parser.QUESTION);
					}
				}

				this.state = 483;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===62) {
					{
					this.state = 482;
					this.predicateOptions();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public predicateOptions(): PredicateOptionsContext {
		let localctx: PredicateOptionsContext = new PredicateOptionsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 94, ANTLRv4Parser.RULE_predicateOptions);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 487;
			this.match(ANTLRv4Parser.LT);
			this.state = 488;
			this.predicateOption();
			this.state = 493;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===56) {
				{
				{
				this.state = 489;
				this.match(ANTLRv4Parser.COMMA);
				this.state = 490;
				this.predicateOption();
				}
				}
				this.state = 495;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 496;
			this.match(ANTLRv4Parser.GT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public predicateOption(): PredicateOptionContext {
		let localctx: PredicateOptionContext = new PredicateOptionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 96, ANTLRv4Parser.RULE_predicateOption);
		try {
			this.state = 506;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 58, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 498;
				this.elementOption();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 499;
				this.identifier();
				this.state = 500;
				this.match(ANTLRv4Parser.ASSIGN);
				this.state = 504;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 4:
					{
					this.state = 501;
					this.actionBlock();
					}
					break;
				case 34:
					{
					this.state = 502;
					this.match(ANTLRv4Parser.INT);
					}
					break;
				case 11:
					{
					this.state = 503;
					this.match(ANTLRv4Parser.STRING_LITERAL);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public labeledElement(): LabeledElementContext {
		let localctx: LabeledElementContext = new LabeledElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 98, ANTLRv4Parser.RULE_labeledElement);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 508;
			this.identifier();
			this.state = 509;
			_la = this._input.LA(1);
			if(!(_la===7 || _la===66)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			this.state = 512;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 9:
			case 11:
			case 13:
			case 71:
			case 74:
				{
				this.state = 510;
				this.atom();
				}
				break;
			case 58:
				{
				this.state = 511;
				this.block();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ebnf(): EbnfContext {
		let localctx: EbnfContext = new EbnfContext(this, this._ctx, this.state);
		this.enterRule(localctx, 100, ANTLRv4Parser.RULE_ebnf);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 514;
			this.block();
			this.state = 516;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & 11) !== 0)) {
				{
				this.state = 515;
				this.blockSuffix();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public blockSuffix(): BlockSuffixContext {
		let localctx: BlockSuffixContext = new BlockSuffixContext(this, this._ctx, this.state);
		this.enterRule(localctx, 102, ANTLRv4Parser.RULE_blockSuffix);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 518;
			this.ebnfSuffix();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ebnfSuffix(): EbnfSuffixContext {
		let localctx: EbnfSuffixContext = new EbnfSuffixContext(this, this._ctx, this.state);
		this.enterRule(localctx, 104, ANTLRv4Parser.RULE_ebnfSuffix);
		let _la: number;
		try {
			this.state = 532;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 64:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 520;
				this.match(ANTLRv4Parser.QUESTION);
				this.state = 522;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===64) {
					{
					this.state = 521;
					this.match(ANTLRv4Parser.QUESTION);
					}
				}

				}
				break;
			case 65:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 524;
				this.match(ANTLRv4Parser.STAR);
				this.state = 526;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===64) {
					{
					this.state = 525;
					this.match(ANTLRv4Parser.QUESTION);
					}
				}

				}
				break;
			case 67:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 528;
				this.match(ANTLRv4Parser.PLUS);
				this.state = 530;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===64) {
					{
					this.state = 529;
					this.match(ANTLRv4Parser.QUESTION);
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public lexerAtom(): LexerAtomContext {
		let localctx: LexerAtomContext = new LexerAtomContext(this, this._ctx, this.state);
		this.enterRule(localctx, 106, ANTLRv4Parser.RULE_lexerAtom);
		try {
			this.state = 539;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 65, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 534;
				this.characterRange();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 535;
				this.terminalDef();
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 536;
				this.notSet();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 537;
				this.match(ANTLRv4Parser.LEXER_CHAR_SET);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 538;
				this.wildcard();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public atom(): AtomContext {
		let localctx: AtomContext = new AtomContext(this, this._ctx, this.state);
		this.enterRule(localctx, 108, ANTLRv4Parser.RULE_atom);
		try {
			this.state = 545;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 11:
			case 13:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 541;
				this.terminalDef();
				}
				break;
			case 9:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 542;
				this.ruleref();
				}
				break;
			case 74:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 543;
				this.notSet();
				}
				break;
			case 71:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 544;
				this.wildcard();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public wildcard(): WildcardContext {
		let localctx: WildcardContext = new WildcardContext(this, this._ctx, this.state);
		this.enterRule(localctx, 110, ANTLRv4Parser.RULE_wildcard);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 547;
			this.match(ANTLRv4Parser.DOT);
			this.state = 549;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===62) {
				{
				this.state = 548;
				this.elementOptions();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public notSet(): NotSetContext {
		let localctx: NotSetContext = new NotSetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 112, ANTLRv4Parser.RULE_notSet);
		try {
			this.state = 555;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 68, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 551;
				this.match(ANTLRv4Parser.NOT);
				this.state = 552;
				this.setElement();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 553;
				this.match(ANTLRv4Parser.NOT);
				this.state = 554;
				this.blockSet();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public blockSet(): BlockSetContext {
		let localctx: BlockSetContext = new BlockSetContext(this, this._ctx, this.state);
		this.enterRule(localctx, 114, ANTLRv4Parser.RULE_blockSet);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 557;
			this.match(ANTLRv4Parser.LPAREN);
			this.state = 558;
			this.setElement();
			this.state = 563;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===68) {
				{
				{
				this.state = 559;
				this.match(ANTLRv4Parser.OR);
				this.state = 560;
				this.setElement();
				}
				}
				this.state = 565;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 566;
			this.match(ANTLRv4Parser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public setElement(): SetElementContext {
		let localctx: SetElementContext = new SetElementContext(this, this._ctx, this.state);
		this.enterRule(localctx, 116, ANTLRv4Parser.RULE_setElement);
		let _la: number;
		try {
			this.state = 578;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 72, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 568;
				this.match(ANTLRv4Parser.TOKEN_REF);
				this.state = 570;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===62) {
					{
					this.state = 569;
					this.elementOptions();
					}
				}

				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 572;
				this.match(ANTLRv4Parser.STRING_LITERAL);
				this.state = 574;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===62) {
					{
					this.state = 573;
					this.elementOptions();
					}
				}

				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 576;
				this.characterRange();
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 577;
				this.match(ANTLRv4Parser.LEXER_CHAR_SET);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let localctx: BlockContext = new BlockContext(this, this._ctx, this.state);
		this.enterRule(localctx, 118, ANTLRv4Parser.RULE_block);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 580;
			this.match(ANTLRv4Parser.LPAREN);
			this.state = 591;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===37 || _la===54 || _la===72) {
				{
				this.state = 582;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===37) {
					{
					this.state = 581;
					this.optionsSpec();
					}
				}

				this.state = 587;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===72) {
					{
					{
					this.state = 584;
					this.ruleAction();
					}
					}
					this.state = 589;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 590;
				this.match(ANTLRv4Parser.COLON);
				}
			}

			this.state = 593;
			this.altList();
			this.state = 594;
			this.match(ANTLRv4Parser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ruleref(): RulerefContext {
		let localctx: RulerefContext = new RulerefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 120, ANTLRv4Parser.RULE_ruleref);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 596;
			this.match(ANTLRv4Parser.RULE_REF);
			this.state = 598;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===36) {
				{
				this.state = 597;
				this.argActionBlock();
				}
			}

			this.state = 601;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la===62) {
				{
				this.state = 600;
				this.elementOptions();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public characterRange(): CharacterRangeContext {
		let localctx: CharacterRangeContext = new CharacterRangeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 122, ANTLRv4Parser.RULE_characterRange);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 603;
			this.match(ANTLRv4Parser.STRING_LITERAL);
			this.state = 604;
			this.match(ANTLRv4Parser.RANGE);
			this.state = 605;
			this.match(ANTLRv4Parser.STRING_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public terminalDef(): TerminalDefContext {
		let localctx: TerminalDefContext = new TerminalDefContext(this, this._ctx, this.state);
		this.enterRule(localctx, 124, ANTLRv4Parser.RULE_terminalDef);
		let _la: number;
		try {
			this.state = 615;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 13:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 607;
				this.match(ANTLRv4Parser.TOKEN_REF);
				this.state = 609;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===62) {
					{
					this.state = 608;
					this.elementOptions();
					}
				}

				}
				break;
			case 11:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 611;
				this.match(ANTLRv4Parser.STRING_LITERAL);
				this.state = 613;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la===62) {
					{
					this.state = 612;
					this.elementOptions();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public elementOptions(): ElementOptionsContext {
		let localctx: ElementOptionsContext = new ElementOptionsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 126, ANTLRv4Parser.RULE_elementOptions);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 617;
			this.match(ANTLRv4Parser.LT);
			this.state = 618;
			this.elementOption();
			this.state = 623;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===56) {
				{
				{
				this.state = 619;
				this.match(ANTLRv4Parser.COMMA);
				this.state = 620;
				this.elementOption();
				}
				}
				this.state = 625;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 626;
			this.match(ANTLRv4Parser.GT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public elementOption(): ElementOptionContext {
		let localctx: ElementOptionContext = new ElementOptionContext(this, this._ctx, this.state);
		this.enterRule(localctx, 128, ANTLRv4Parser.RULE_elementOption);
		try {
			this.state = 636;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 83, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 628;
				this.qualifiedIdentifier();
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 629;
				this.identifier();
				this.state = 630;
				this.match(ANTLRv4Parser.ASSIGN);
				this.state = 634;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case 9:
				case 13:
					{
					this.state = 631;
					this.qualifiedIdentifier();
					}
					break;
				case 11:
					{
					this.state = 632;
					this.match(ANTLRv4Parser.STRING_LITERAL);
					}
					break;
				case 34:
					{
					this.state = 633;
					this.match(ANTLRv4Parser.INT);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let localctx: IdentifierContext = new IdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 130, ANTLRv4Parser.RULE_identifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 638;
			_la = this._input.LA(1);
			if(!(_la===9 || _la===13)) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		let localctx: QualifiedIdentifierContext = new QualifiedIdentifierContext(this, this._ctx, this.state);
		this.enterRule(localctx, 132, ANTLRv4Parser.RULE_qualifiedIdentifier);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 640;
			this.identifier();
			this.state = 645;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===71) {
				{
				{
				this.state = 641;
				this.match(ANTLRv4Parser.DOT);
				this.state = 642;
				this.identifier();
				}
				}
				this.state = 647;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public static readonly _serializedATN: number[] = [4,1,79,649,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,
	7,17,2,18,7,18,2,19,7,19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,
	24,2,25,7,25,2,26,7,26,2,27,7,27,2,28,7,28,2,29,7,29,2,30,7,30,2,31,7,31,
	2,32,7,32,2,33,7,33,2,34,7,34,2,35,7,35,2,36,7,36,2,37,7,37,2,38,7,38,2,
	39,7,39,2,40,7,40,2,41,7,41,2,42,7,42,2,43,7,43,2,44,7,44,2,45,7,45,2,46,
	7,46,2,47,7,47,2,48,7,48,2,49,7,49,2,50,7,50,2,51,7,51,2,52,7,52,2,53,7,
	53,2,54,7,54,2,55,7,55,2,56,7,56,2,57,7,57,2,58,7,58,2,59,7,59,2,60,7,60,
	2,61,7,61,2,62,7,62,2,63,7,63,2,64,7,64,2,65,7,65,2,66,7,66,1,0,1,0,5,0,
	137,8,0,10,0,12,0,140,9,0,1,0,1,0,5,0,144,8,0,10,0,12,0,147,9,0,1,0,1,0,
	1,1,1,1,1,1,1,1,1,2,1,2,1,2,1,2,1,2,3,2,160,8,2,1,3,1,3,1,3,1,3,1,3,3,3,
	167,8,3,1,4,1,4,1,4,1,4,5,4,173,8,4,10,4,12,4,176,9,4,1,4,1,4,1,5,1,5,1,
	5,1,5,1,6,1,6,1,6,5,6,187,8,6,10,6,12,6,190,9,6,1,6,1,6,1,6,3,6,195,8,6,
	1,7,1,7,1,7,1,7,5,7,201,8,7,10,7,12,7,204,9,7,1,7,1,7,1,8,1,8,1,8,1,8,1,
	8,3,8,213,8,8,1,9,1,9,3,9,217,8,9,1,9,1,9,1,10,1,10,3,10,223,8,10,1,10,
	1,10,1,11,1,11,1,11,5,11,230,8,11,10,11,12,11,233,9,11,1,11,3,11,236,8,
	11,1,12,1,12,1,12,1,12,3,12,242,8,12,1,12,1,12,1,12,1,13,1,13,1,13,3,13,
	250,8,13,1,14,1,14,1,15,1,15,5,15,256,8,15,10,15,12,15,259,9,15,1,15,1,
	15,1,16,1,16,1,16,1,16,5,16,267,8,16,10,16,12,16,270,9,16,1,17,5,17,273,
	8,17,10,17,12,17,276,9,17,1,18,1,18,3,18,280,8,18,1,19,3,19,283,8,19,1,
	19,1,19,3,19,287,8,19,1,19,3,19,290,8,19,1,19,3,19,293,8,19,1,19,3,19,296,
	8,19,1,19,5,19,299,8,19,10,19,12,19,302,9,19,1,19,1,19,1,19,1,19,1,19,1,
	20,5,20,310,8,20,10,20,12,20,313,9,20,1,20,3,20,316,8,20,1,21,1,21,1,21,
	1,21,1,22,1,22,1,22,1,23,1,23,3,23,327,8,23,1,24,1,24,1,24,1,25,1,25,1,
	25,1,25,5,25,336,8,25,10,25,12,25,339,9,25,1,26,1,26,1,26,1,27,1,27,1,27,
	1,27,1,28,4,28,349,8,28,11,28,12,28,350,1,29,1,29,1,30,1,30,1,31,1,31,1,
	31,5,31,360,8,31,10,31,12,31,363,9,31,1,32,1,32,1,32,3,32,368,8,32,1,33,
	3,33,371,8,33,1,33,1,33,3,33,375,8,33,1,33,1,33,1,33,1,33,1,34,1,34,1,35,
	1,35,1,35,5,35,386,8,35,10,35,12,35,389,9,35,1,36,1,36,3,36,393,8,36,1,
	36,3,36,396,8,36,1,37,4,37,399,8,37,11,37,12,37,400,1,37,3,37,404,8,37,
	1,38,1,38,3,38,408,8,38,1,38,1,38,3,38,412,8,38,1,38,1,38,3,38,416,8,38,
	3,38,418,8,38,1,39,1,39,1,39,1,39,1,40,1,40,1,40,1,40,5,40,428,8,40,10,
	40,12,40,431,9,40,1,41,1,41,1,41,1,41,1,41,1,41,3,41,439,8,41,1,42,1,42,
	3,42,443,8,42,1,43,1,43,3,43,447,8,43,1,44,1,44,1,44,5,44,452,8,44,10,44,
	12,44,455,9,44,1,45,3,45,458,8,45,1,45,4,45,461,8,45,11,45,12,45,462,1,
	45,3,45,466,8,45,1,46,1,46,1,46,3,46,471,8,46,1,46,1,46,1,46,3,46,476,8,
	46,1,46,1,46,1,46,3,46,481,8,46,1,46,3,46,484,8,46,3,46,486,8,46,1,47,1,
	47,1,47,1,47,5,47,492,8,47,10,47,12,47,495,9,47,1,47,1,47,1,48,1,48,1,48,
	1,48,1,48,1,48,3,48,505,8,48,3,48,507,8,48,1,49,1,49,1,49,1,49,3,49,513,
	8,49,1,50,1,50,3,50,517,8,50,1,51,1,51,1,52,1,52,3,52,523,8,52,1,52,1,52,
	3,52,527,8,52,1,52,1,52,3,52,531,8,52,3,52,533,8,52,1,53,1,53,1,53,1,53,
	1,53,3,53,540,8,53,1,54,1,54,1,54,1,54,3,54,546,8,54,1,55,1,55,3,55,550,
	8,55,1,56,1,56,1,56,1,56,3,56,556,8,56,1,57,1,57,1,57,1,57,5,57,562,8,57,
	10,57,12,57,565,9,57,1,57,1,57,1,58,1,58,3,58,571,8,58,1,58,1,58,3,58,575,
	8,58,1,58,1,58,3,58,579,8,58,1,59,1,59,3,59,583,8,59,1,59,5,59,586,8,59,
	10,59,12,59,589,9,59,1,59,3,59,592,8,59,1,59,1,59,1,59,1,60,1,60,3,60,599,
	8,60,1,60,3,60,602,8,60,1,61,1,61,1,61,1,61,1,62,1,62,3,62,610,8,62,1,62,
	1,62,3,62,614,8,62,3,62,616,8,62,1,63,1,63,1,63,1,63,5,63,622,8,63,10,63,
	12,63,625,9,63,1,63,1,63,1,64,1,64,1,64,1,64,1,64,1,64,3,64,635,8,64,3,
	64,637,8,64,1,65,1,65,1,66,1,66,1,66,5,66,644,8,66,10,66,12,66,647,9,66,
	1,66,1,257,0,67,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,
	40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,
	88,90,92,94,96,98,100,102,104,106,108,110,112,114,116,118,120,122,124,126,
	128,130,132,0,3,2,0,41,41,45,47,2,0,7,7,66,66,2,0,9,9,13,13,686,0,134,1,
	0,0,0,2,150,1,0,0,0,4,159,1,0,0,0,6,166,1,0,0,0,8,168,1,0,0,0,10,179,1,
	0,0,0,12,194,1,0,0,0,14,196,1,0,0,0,16,212,1,0,0,0,18,214,1,0,0,0,20,220,
	1,0,0,0,22,226,1,0,0,0,24,237,1,0,0,0,26,249,1,0,0,0,28,251,1,0,0,0,30,
	253,1,0,0,0,32,262,1,0,0,0,34,274,1,0,0,0,36,279,1,0,0,0,38,282,1,0,0,0,
	40,311,1,0,0,0,42,317,1,0,0,0,44,321,1,0,0,0,46,326,1,0,0,0,48,328,1,0,
	0,0,50,331,1,0,0,0,52,340,1,0,0,0,54,343,1,0,0,0,56,348,1,0,0,0,58,352,
	1,0,0,0,60,354,1,0,0,0,62,356,1,0,0,0,64,364,1,0,0,0,66,370,1,0,0,0,68,
	380,1,0,0,0,70,382,1,0,0,0,72,395,1,0,0,0,74,403,1,0,0,0,76,417,1,0,0,0,
	78,419,1,0,0,0,80,423,1,0,0,0,82,438,1,0,0,0,84,442,1,0,0,0,86,446,1,0,
	0,0,88,448,1,0,0,0,90,465,1,0,0,0,92,485,1,0,0,0,94,487,1,0,0,0,96,506,
	1,0,0,0,98,508,1,0,0,0,100,514,1,0,0,0,102,518,1,0,0,0,104,532,1,0,0,0,
	106,539,1,0,0,0,108,545,1,0,0,0,110,547,1,0,0,0,112,555,1,0,0,0,114,557,
	1,0,0,0,116,578,1,0,0,0,118,580,1,0,0,0,120,596,1,0,0,0,122,603,1,0,0,0,
	124,615,1,0,0,0,126,617,1,0,0,0,128,636,1,0,0,0,130,638,1,0,0,0,132,640,
	1,0,0,0,134,138,3,2,1,0,135,137,3,6,3,0,136,135,1,0,0,0,137,140,1,0,0,0,
	138,136,1,0,0,0,138,139,1,0,0,0,139,141,1,0,0,0,140,138,1,0,0,0,141,145,
	3,34,17,0,142,144,3,32,16,0,143,142,1,0,0,0,144,147,1,0,0,0,145,143,1,0,
	0,0,145,146,1,0,0,0,146,148,1,0,0,0,147,145,1,0,0,0,148,149,5,0,0,1,149,
	1,1,0,0,0,150,151,3,4,2,0,151,152,3,130,65,0,152,153,5,57,0,0,153,3,1,0,
	0,0,154,155,5,42,0,0,155,160,5,44,0,0,156,157,5,43,0,0,157,160,5,44,0,0,
	158,160,5,44,0,0,159,154,1,0,0,0,159,156,1,0,0,0,159,158,1,0,0,0,160,5,
	1,0,0,0,161,167,3,8,4,0,162,167,3,14,7,0,163,167,3,18,9,0,164,167,3,20,
	10,0,165,167,3,24,12,0,166,161,1,0,0,0,166,162,1,0,0,0,166,163,1,0,0,0,
	166,164,1,0,0,0,166,165,1,0,0,0,167,7,1,0,0,0,168,174,5,37,0,0,169,170,
	3,10,5,0,170,171,5,57,0,0,171,173,1,0,0,0,172,169,1,0,0,0,173,176,1,0,0,
	0,174,172,1,0,0,0,174,175,1,0,0,0,175,177,1,0,0,0,176,174,1,0,0,0,177,178,
	5,60,0,0,178,9,1,0,0,0,179,180,3,130,65,0,180,181,5,7,0,0,181,182,3,12,
	6,0,182,11,1,0,0,0,183,188,3,130,65,0,184,185,5,71,0,0,185,187,3,130,65,
	0,186,184,1,0,0,0,187,190,1,0,0,0,188,186,1,0,0,0,188,189,1,0,0,0,189,195,
	1,0,0,0,190,188,1,0,0,0,191,195,5,11,0,0,192,195,3,28,14,0,193,195,5,34,
	0,0,194,183,1,0,0,0,194,191,1,0,0,0,194,192,1,0,0,0,194,193,1,0,0,0,195,
	13,1,0,0,0,196,197,5,40,0,0,197,202,3,16,8,0,198,199,5,56,0,0,199,201,3,
	16,8,0,200,198,1,0,0,0,201,204,1,0,0,0,202,200,1,0,0,0,202,203,1,0,0,0,
	203,205,1,0,0,0,204,202,1,0,0,0,205,206,5,57,0,0,206,15,1,0,0,0,207,208,
	3,130,65,0,208,209,5,7,0,0,209,210,3,130,65,0,210,213,1,0,0,0,211,213,3,
	130,65,0,212,207,1,0,0,0,212,211,1,0,0,0,213,17,1,0,0,0,214,216,5,38,0,
	0,215,217,3,22,11,0,216,215,1,0,0,0,216,217,1,0,0,0,217,218,1,0,0,0,218,
	219,5,60,0,0,219,19,1,0,0,0,220,222,5,39,0,0,221,223,3,22,11,0,222,221,
	1,0,0,0,222,223,1,0,0,0,223,224,1,0,0,0,224,225,5,60,0,0,225,21,1,0,0,0,
	226,231,3,130,65,0,227,228,5,56,0,0,228,230,3,130,65,0,229,227,1,0,0,0,
	230,233,1,0,0,0,231,229,1,0,0,0,231,232,1,0,0,0,232,235,1,0,0,0,233,231,
	1,0,0,0,234,236,5,56,0,0,235,234,1,0,0,0,235,236,1,0,0,0,236,23,1,0,0,0,
	237,241,5,72,0,0,238,239,3,26,13,0,239,240,5,55,0,0,240,242,1,0,0,0,241,
	238,1,0,0,0,241,242,1,0,0,0,242,243,1,0,0,0,243,244,3,130,65,0,244,245,
	3,28,14,0,245,25,1,0,0,0,246,250,3,130,65,0,247,250,5,42,0,0,248,250,5,
	43,0,0,249,246,1,0,0,0,249,247,1,0,0,0,249,248,1,0,0,0,250,27,1,0,0,0,251,
	252,5,4,0,0,252,29,1,0,0,0,253,257,5,36,0,0,254,256,5,78,0,0,255,254,1,
	0,0,0,256,259,1,0,0,0,257,258,1,0,0,0,257,255,1,0,0,0,258,260,1,0,0,0,259,
	257,1,0,0,0,260,261,5,76,0,0,261,31,1,0,0,0,262,263,5,53,0,0,263,264,3,
	130,65,0,264,268,5,57,0,0,265,267,3,66,33,0,266,265,1,0,0,0,267,270,1,0,
	0,0,268,266,1,0,0,0,268,269,1,0,0,0,269,33,1,0,0,0,270,268,1,0,0,0,271,
	273,3,36,18,0,272,271,1,0,0,0,273,276,1,0,0,0,274,272,1,0,0,0,274,275,1,
	0,0,0,275,35,1,0,0,0,276,274,1,0,0,0,277,280,3,38,19,0,278,280,3,66,33,
	0,279,277,1,0,0,0,279,278,1,0,0,0,280,37,1,0,0,0,281,283,3,56,28,0,282,
	281,1,0,0,0,282,283,1,0,0,0,283,284,1,0,0,0,284,286,5,9,0,0,285,287,3,30,
	15,0,286,285,1,0,0,0,286,287,1,0,0,0,287,289,1,0,0,0,288,290,3,48,24,0,
	289,288,1,0,0,0,289,290,1,0,0,0,290,292,1,0,0,0,291,293,3,50,25,0,292,291,
	1,0,0,0,292,293,1,0,0,0,293,295,1,0,0,0,294,296,3,52,26,0,295,294,1,0,0,
	0,295,296,1,0,0,0,296,300,1,0,0,0,297,299,3,46,23,0,298,297,1,0,0,0,299,
	302,1,0,0,0,300,298,1,0,0,0,300,301,1,0,0,0,301,303,1,0,0,0,302,300,1,0,
	0,0,303,304,5,54,0,0,304,305,3,60,30,0,305,306,5,57,0,0,306,307,3,40,20,
	0,307,39,1,0,0,0,308,310,3,42,21,0,309,308,1,0,0,0,310,313,1,0,0,0,311,
	309,1,0,0,0,311,312,1,0,0,0,312,315,1,0,0,0,313,311,1,0,0,0,314,316,3,44,
	22,0,315,314,1,0,0,0,315,316,1,0,0,0,316,41,1,0,0,0,317,318,5,51,0,0,318,
	319,3,30,15,0,319,320,3,28,14,0,320,43,1,0,0,0,321,322,5,52,0,0,322,323,
	3,28,14,0,323,45,1,0,0,0,324,327,3,8,4,0,325,327,3,54,27,0,326,324,1,0,
	0,0,326,325,1,0,0,0,327,47,1,0,0,0,328,329,5,48,0,0,329,330,3,30,15,0,330,
	49,1,0,0,0,331,332,5,50,0,0,332,337,3,132,66,0,333,334,5,56,0,0,334,336,
	3,132,66,0,335,333,1,0,0,0,336,339,1,0,0,0,337,335,1,0,0,0,337,338,1,0,
	0,0,338,51,1,0,0,0,339,337,1,0,0,0,340,341,5,49,0,0,341,342,3,30,15,0,342,
	53,1,0,0,0,343,344,5,72,0,0,344,345,3,130,65,0,345,346,3,28,14,0,346,55,
	1,0,0,0,347,349,3,58,29,0,348,347,1,0,0,0,349,350,1,0,0,0,350,348,1,0,0,
	0,350,351,1,0,0,0,351,57,1,0,0,0,352,353,7,0,0,0,353,59,1,0,0,0,354,355,
	3,62,31,0,355,61,1,0,0,0,356,361,3,64,32,0,357,358,5,68,0,0,358,360,3,64,
	32,0,359,357,1,0,0,0,360,363,1,0,0,0,361,359,1,0,0,0,361,362,1,0,0,0,362,
	63,1,0,0,0,363,361,1,0,0,0,364,367,3,90,45,0,365,366,5,73,0,0,366,368,3,
	130,65,0,367,365,1,0,0,0,367,368,1,0,0,0,368,65,1,0,0,0,369,371,5,41,0,
	0,370,369,1,0,0,0,370,371,1,0,0,0,371,372,1,0,0,0,372,374,5,13,0,0,373,
	375,3,8,4,0,374,373,1,0,0,0,374,375,1,0,0,0,375,376,1,0,0,0,376,377,5,54,
	0,0,377,378,3,68,34,0,378,379,5,57,0,0,379,67,1,0,0,0,380,381,3,70,35,0,
	381,69,1,0,0,0,382,387,3,72,36,0,383,384,5,68,0,0,384,386,3,72,36,0,385,
	383,1,0,0,0,386,389,1,0,0,0,387,385,1,0,0,0,387,388,1,0,0,0,388,71,1,0,
	0,0,389,387,1,0,0,0,390,392,3,74,37,0,391,393,3,80,40,0,392,391,1,0,0,0,
	392,393,1,0,0,0,393,396,1,0,0,0,394,396,1,0,0,0,395,390,1,0,0,0,395,394,
	1,0,0,0,396,73,1,0,0,0,397,399,3,76,38,0,398,397,1,0,0,0,399,400,1,0,0,
	0,400,398,1,0,0,0,400,401,1,0,0,0,401,404,1,0,0,0,402,404,1,0,0,0,403,398,
	1,0,0,0,403,402,1,0,0,0,404,75,1,0,0,0,405,407,3,106,53,0,406,408,3,104,
	52,0,407,406,1,0,0,0,407,408,1,0,0,0,408,418,1,0,0,0,409,411,3,78,39,0,
	410,412,3,104,52,0,411,410,1,0,0,0,411,412,1,0,0,0,412,418,1,0,0,0,413,
	415,3,28,14,0,414,416,5,64,0,0,415,414,1,0,0,0,415,416,1,0,0,0,416,418,
	1,0,0,0,417,405,1,0,0,0,417,409,1,0,0,0,417,413,1,0,0,0,418,77,1,0,0,0,
	419,420,5,58,0,0,420,421,3,70,35,0,421,422,5,59,0,0,422,79,1,0,0,0,423,
	424,5,61,0,0,424,429,3,82,41,0,425,426,5,56,0,0,426,428,3,82,41,0,427,425,
	1,0,0,0,428,431,1,0,0,0,429,427,1,0,0,0,429,430,1,0,0,0,430,81,1,0,0,0,
	431,429,1,0,0,0,432,433,3,84,42,0,433,434,5,58,0,0,434,435,3,86,43,0,435,
	436,5,59,0,0,436,439,1,0,0,0,437,439,3,84,42,0,438,432,1,0,0,0,438,437,
	1,0,0,0,439,83,1,0,0,0,440,443,3,130,65,0,441,443,5,53,0,0,442,440,1,0,
	0,0,442,441,1,0,0,0,443,85,1,0,0,0,444,447,3,130,65,0,445,447,5,34,0,0,
	446,444,1,0,0,0,446,445,1,0,0,0,447,87,1,0,0,0,448,453,3,90,45,0,449,450,
	5,68,0,0,450,452,3,90,45,0,451,449,1,0,0,0,452,455,1,0,0,0,453,451,1,0,
	0,0,453,454,1,0,0,0,454,89,1,0,0,0,455,453,1,0,0,0,456,458,3,126,63,0,457,
	456,1,0,0,0,457,458,1,0,0,0,458,460,1,0,0,0,459,461,3,92,46,0,460,459,1,
	0,0,0,461,462,1,0,0,0,462,460,1,0,0,0,462,463,1,0,0,0,463,466,1,0,0,0,464,
	466,1,0,0,0,465,457,1,0,0,0,465,464,1,0,0,0,466,91,1,0,0,0,467,470,3,98,
	49,0,468,471,3,104,52,0,469,471,1,0,0,0,470,468,1,0,0,0,470,469,1,0,0,0,
	471,486,1,0,0,0,472,475,3,108,54,0,473,476,3,104,52,0,474,476,1,0,0,0,475,
	473,1,0,0,0,475,474,1,0,0,0,476,486,1,0,0,0,477,486,3,100,50,0,478,480,
	3,28,14,0,479,481,5,64,0,0,480,479,1,0,0,0,480,481,1,0,0,0,481,483,1,0,
	0,0,482,484,3,94,47,0,483,482,1,0,0,0,483,484,1,0,0,0,484,486,1,0,0,0,485,
	467,1,0,0,0,485,472,1,0,0,0,485,477,1,0,0,0,485,478,1,0,0,0,486,93,1,0,
	0,0,487,488,5,62,0,0,488,493,3,96,48,0,489,490,5,56,0,0,490,492,3,96,48,
	0,491,489,1,0,0,0,492,495,1,0,0,0,493,491,1,0,0,0,493,494,1,0,0,0,494,496,
	1,0,0,0,495,493,1,0,0,0,496,497,5,63,0,0,497,95,1,0,0,0,498,507,3,128,64,
	0,499,500,3,130,65,0,500,504,5,7,0,0,501,505,3,28,14,0,502,505,5,34,0,0,
	503,505,5,11,0,0,504,501,1,0,0,0,504,502,1,0,0,0,504,503,1,0,0,0,505,507,
	1,0,0,0,506,498,1,0,0,0,506,499,1,0,0,0,507,97,1,0,0,0,508,509,3,130,65,
	0,509,512,7,1,0,0,510,513,3,108,54,0,511,513,3,118,59,0,512,510,1,0,0,0,
	512,511,1,0,0,0,513,99,1,0,0,0,514,516,3,118,59,0,515,517,3,102,51,0,516,
	515,1,0,0,0,516,517,1,0,0,0,517,101,1,0,0,0,518,519,3,104,52,0,519,103,
	1,0,0,0,520,522,5,64,0,0,521,523,5,64,0,0,522,521,1,0,0,0,522,523,1,0,0,
	0,523,533,1,0,0,0,524,526,5,65,0,0,525,527,5,64,0,0,526,525,1,0,0,0,526,
	527,1,0,0,0,527,533,1,0,0,0,528,530,5,67,0,0,529,531,5,64,0,0,530,529,1,
	0,0,0,530,531,1,0,0,0,531,533,1,0,0,0,532,520,1,0,0,0,532,524,1,0,0,0,532,
	528,1,0,0,0,533,105,1,0,0,0,534,540,3,122,61,0,535,540,3,124,62,0,536,540,
	3,112,56,0,537,540,5,8,0,0,538,540,3,110,55,0,539,534,1,0,0,0,539,535,1,
	0,0,0,539,536,1,0,0,0,539,537,1,0,0,0,539,538,1,0,0,0,540,107,1,0,0,0,541,
	546,3,124,62,0,542,546,3,120,60,0,543,546,3,112,56,0,544,546,3,110,55,0,
	545,541,1,0,0,0,545,542,1,0,0,0,545,543,1,0,0,0,545,544,1,0,0,0,546,109,
	1,0,0,0,547,549,5,71,0,0,548,550,3,126,63,0,549,548,1,0,0,0,549,550,1,0,
	0,0,550,111,1,0,0,0,551,552,5,74,0,0,552,556,3,116,58,0,553,554,5,74,0,
	0,554,556,3,114,57,0,555,551,1,0,0,0,555,553,1,0,0,0,556,113,1,0,0,0,557,
	558,5,58,0,0,558,563,3,116,58,0,559,560,5,68,0,0,560,562,3,116,58,0,561,
	559,1,0,0,0,562,565,1,0,0,0,563,561,1,0,0,0,563,564,1,0,0,0,564,566,1,0,
	0,0,565,563,1,0,0,0,566,567,5,59,0,0,567,115,1,0,0,0,568,570,5,13,0,0,569,
	571,3,126,63,0,570,569,1,0,0,0,570,571,1,0,0,0,571,579,1,0,0,0,572,574,
	5,11,0,0,573,575,3,126,63,0,574,573,1,0,0,0,574,575,1,0,0,0,575,579,1,0,
	0,0,576,579,3,122,61,0,577,579,5,8,0,0,578,568,1,0,0,0,578,572,1,0,0,0,
	578,576,1,0,0,0,578,577,1,0,0,0,579,117,1,0,0,0,580,591,5,58,0,0,581,583,
	3,8,4,0,582,581,1,0,0,0,582,583,1,0,0,0,583,587,1,0,0,0,584,586,3,54,27,
	0,585,584,1,0,0,0,586,589,1,0,0,0,587,585,1,0,0,0,587,588,1,0,0,0,588,590,
	1,0,0,0,589,587,1,0,0,0,590,592,5,54,0,0,591,582,1,0,0,0,591,592,1,0,0,
	0,592,593,1,0,0,0,593,594,3,88,44,0,594,595,5,59,0,0,595,119,1,0,0,0,596,
	598,5,9,0,0,597,599,3,30,15,0,598,597,1,0,0,0,598,599,1,0,0,0,599,601,1,
	0,0,0,600,602,3,126,63,0,601,600,1,0,0,0,601,602,1,0,0,0,602,121,1,0,0,
	0,603,604,5,11,0,0,604,605,5,70,0,0,605,606,5,11,0,0,606,123,1,0,0,0,607,
	609,5,13,0,0,608,610,3,126,63,0,609,608,1,0,0,0,609,610,1,0,0,0,610,616,
	1,0,0,0,611,613,5,11,0,0,612,614,3,126,63,0,613,612,1,0,0,0,613,614,1,0,
	0,0,614,616,1,0,0,0,615,607,1,0,0,0,615,611,1,0,0,0,616,125,1,0,0,0,617,
	618,5,62,0,0,618,623,3,128,64,0,619,620,5,56,0,0,620,622,3,128,64,0,621,
	619,1,0,0,0,622,625,1,0,0,0,623,621,1,0,0,0,623,624,1,0,0,0,624,626,1,0,
	0,0,625,623,1,0,0,0,626,627,5,63,0,0,627,127,1,0,0,0,628,637,3,132,66,0,
	629,630,3,130,65,0,630,634,5,7,0,0,631,635,3,132,66,0,632,635,5,11,0,0,
	633,635,5,34,0,0,634,631,1,0,0,0,634,632,1,0,0,0,634,633,1,0,0,0,635,637,
	1,0,0,0,636,628,1,0,0,0,636,629,1,0,0,0,637,129,1,0,0,0,638,639,7,2,0,0,
	639,131,1,0,0,0,640,645,3,130,65,0,641,642,5,71,0,0,642,644,3,130,65,0,
	643,641,1,0,0,0,644,647,1,0,0,0,645,643,1,0,0,0,645,646,1,0,0,0,646,133,
	1,0,0,0,647,645,1,0,0,0,85,138,145,159,166,174,188,194,202,212,216,222,
	231,235,241,249,257,268,274,279,282,286,289,292,295,300,311,315,326,337,
	350,361,367,370,374,387,392,395,400,403,407,411,415,417,429,438,442,446,
	453,457,462,465,470,475,480,483,485,493,504,506,512,516,522,526,530,532,
	539,545,549,555,563,570,574,578,582,587,591,598,601,609,613,615,623,634,
	636,645];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ANTLRv4Parser.__ATN) {
			ANTLRv4Parser.__ATN = new ATNDeserializer().deserialize(ANTLRv4Parser._serializedATN);
		}

		return ANTLRv4Parser.__ATN;
	}


	static DecisionsToDFA = ANTLRv4Parser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class GrammarSpecContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public grammarDecl(): GrammarDeclContext {
		return this.getTypedRuleContext(GrammarDeclContext, 0) as GrammarDeclContext;
	}
	public rules(): RulesContext {
		return this.getTypedRuleContext(RulesContext, 0) as RulesContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(ANTLRv4Parser.EOF, 0);
	}
	public prequelConstruct_list(): PrequelConstructContext[] {
		return this.getTypedRuleContexts(PrequelConstructContext) as PrequelConstructContext[];
	}
	public prequelConstruct(i: number): PrequelConstructContext {
		return this.getTypedRuleContext(PrequelConstructContext, i) as PrequelConstructContext;
	}
	public modeSpec_list(): ModeSpecContext[] {
		return this.getTypedRuleContexts(ModeSpecContext) as ModeSpecContext[];
	}
	public modeSpec(i: number): ModeSpecContext {
		return this.getTypedRuleContext(ModeSpecContext, i) as ModeSpecContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_grammarSpec;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterGrammarSpec) {
	 		listener.enterGrammarSpec(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitGrammarSpec) {
	 		listener.exitGrammarSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitGrammarSpec) {
			return visitor.visitGrammarSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GrammarDeclContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public grammarType(): GrammarTypeContext {
		return this.getTypedRuleContext(GrammarTypeContext, 0) as GrammarTypeContext;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public SEMI(): TerminalNode {
		return this.getToken(ANTLRv4Parser.SEMI, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_grammarDecl;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterGrammarDecl) {
	 		listener.enterGrammarDecl(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitGrammarDecl) {
	 		listener.exitGrammarDecl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitGrammarDecl) {
			return visitor.visitGrammarDecl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GrammarTypeContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LEXER(): TerminalNode {
		return this.getToken(ANTLRv4Parser.LEXER, 0);
	}
	public GRAMMAR(): TerminalNode {
		return this.getToken(ANTLRv4Parser.GRAMMAR, 0);
	}
	public PARSER(): TerminalNode {
		return this.getToken(ANTLRv4Parser.PARSER, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_grammarType;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterGrammarType) {
	 		listener.enterGrammarType(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitGrammarType) {
	 		listener.exitGrammarType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitGrammarType) {
			return visitor.visitGrammarType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrequelConstructContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public optionsSpec(): OptionsSpecContext {
		return this.getTypedRuleContext(OptionsSpecContext, 0) as OptionsSpecContext;
	}
	public delegateGrammars(): DelegateGrammarsContext {
		return this.getTypedRuleContext(DelegateGrammarsContext, 0) as DelegateGrammarsContext;
	}
	public tokensSpec(): TokensSpecContext {
		return this.getTypedRuleContext(TokensSpecContext, 0) as TokensSpecContext;
	}
	public channelsSpec(): ChannelsSpecContext {
		return this.getTypedRuleContext(ChannelsSpecContext, 0) as ChannelsSpecContext;
	}
	public action_(): Action_Context {
		return this.getTypedRuleContext(Action_Context, 0) as Action_Context;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_prequelConstruct;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterPrequelConstruct) {
	 		listener.enterPrequelConstruct(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitPrequelConstruct) {
	 		listener.exitPrequelConstruct(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitPrequelConstruct) {
			return visitor.visitPrequelConstruct(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OptionsSpecContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public OPTIONS(): TerminalNode {
		return this.getToken(ANTLRv4Parser.OPTIONS, 0);
	}
	public RBRACE(): TerminalNode {
		return this.getToken(ANTLRv4Parser.RBRACE, 0);
	}
	public option_list(): OptionContext[] {
		return this.getTypedRuleContexts(OptionContext) as OptionContext[];
	}
	public option(i: number): OptionContext {
		return this.getTypedRuleContext(OptionContext, i) as OptionContext;
	}
	public SEMI_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.SEMI);
	}
	public SEMI(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.SEMI, i);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_optionsSpec;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterOptionsSpec) {
	 		listener.enterOptionsSpec(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitOptionsSpec) {
	 		listener.exitOptionsSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitOptionsSpec) {
			return visitor.visitOptionsSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OptionContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.ASSIGN, 0);
	}
	public optionValue(): OptionValueContext {
		return this.getTypedRuleContext(OptionValueContext, 0) as OptionValueContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_option;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterOption) {
	 		listener.enterOption(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitOption) {
	 		listener.exitOption(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitOption) {
			return visitor.visitOption(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class OptionValueContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier_list(): IdentifierContext[] {
		return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
	}
	public identifier(i: number): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
	}
	public DOT_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.DOT);
	}
	public DOT(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.DOT, i);
	}
	public STRING_LITERAL(): TerminalNode {
		return this.getToken(ANTLRv4Parser.STRING_LITERAL, 0);
	}
	public actionBlock(): ActionBlockContext {
		return this.getTypedRuleContext(ActionBlockContext, 0) as ActionBlockContext;
	}
	public INT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.INT, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_optionValue;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterOptionValue) {
	 		listener.enterOptionValue(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitOptionValue) {
	 		listener.exitOptionValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitOptionValue) {
			return visitor.visitOptionValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DelegateGrammarsContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IMPORT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.IMPORT, 0);
	}
	public delegateGrammar_list(): DelegateGrammarContext[] {
		return this.getTypedRuleContexts(DelegateGrammarContext) as DelegateGrammarContext[];
	}
	public delegateGrammar(i: number): DelegateGrammarContext {
		return this.getTypedRuleContext(DelegateGrammarContext, i) as DelegateGrammarContext;
	}
	public SEMI(): TerminalNode {
		return this.getToken(ANTLRv4Parser.SEMI, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_delegateGrammars;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterDelegateGrammars) {
	 		listener.enterDelegateGrammars(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitDelegateGrammars) {
	 		listener.exitDelegateGrammars(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitDelegateGrammars) {
			return visitor.visitDelegateGrammars(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DelegateGrammarContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier_list(): IdentifierContext[] {
		return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
	}
	public identifier(i: number): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.ASSIGN, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_delegateGrammar;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterDelegateGrammar) {
	 		listener.enterDelegateGrammar(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitDelegateGrammar) {
	 		listener.exitDelegateGrammar(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitDelegateGrammar) {
			return visitor.visitDelegateGrammar(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TokensSpecContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TOKENS(): TerminalNode {
		return this.getToken(ANTLRv4Parser.TOKENS, 0);
	}
	public RBRACE(): TerminalNode {
		return this.getToken(ANTLRv4Parser.RBRACE, 0);
	}
	public idList(): IdListContext {
		return this.getTypedRuleContext(IdListContext, 0) as IdListContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_tokensSpec;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterTokensSpec) {
	 		listener.enterTokensSpec(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitTokensSpec) {
	 		listener.exitTokensSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitTokensSpec) {
			return visitor.visitTokensSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ChannelsSpecContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CHANNELS(): TerminalNode {
		return this.getToken(ANTLRv4Parser.CHANNELS, 0);
	}
	public RBRACE(): TerminalNode {
		return this.getToken(ANTLRv4Parser.RBRACE, 0);
	}
	public idList(): IdListContext {
		return this.getTypedRuleContext(IdListContext, 0) as IdListContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_channelsSpec;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterChannelsSpec) {
	 		listener.enterChannelsSpec(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitChannelsSpec) {
	 		listener.exitChannelsSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitChannelsSpec) {
			return visitor.visitChannelsSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdListContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier_list(): IdentifierContext[] {
		return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
	}
	public identifier(i: number): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_idList;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterIdList) {
	 		listener.enterIdList(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitIdList) {
	 		listener.exitIdList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitIdList) {
			return visitor.visitIdList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class Action_Context extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public AT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.AT, 0);
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public actionBlock(): ActionBlockContext {
		return this.getTypedRuleContext(ActionBlockContext, 0) as ActionBlockContext;
	}
	public actionScopeName(): ActionScopeNameContext {
		return this.getTypedRuleContext(ActionScopeNameContext, 0) as ActionScopeNameContext;
	}
	public COLONCOLON(): TerminalNode {
		return this.getToken(ANTLRv4Parser.COLONCOLON, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_action_;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterAction_) {
	 		listener.enterAction_(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitAction_) {
	 		listener.exitAction_(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitAction_) {
			return visitor.visitAction_(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActionScopeNameContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public LEXER(): TerminalNode {
		return this.getToken(ANTLRv4Parser.LEXER, 0);
	}
	public PARSER(): TerminalNode {
		return this.getToken(ANTLRv4Parser.PARSER, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_actionScopeName;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterActionScopeName) {
	 		listener.enterActionScopeName(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitActionScopeName) {
	 		listener.exitActionScopeName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitActionScopeName) {
			return visitor.visitActionScopeName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActionBlockContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ACTION(): TerminalNode {
		return this.getToken(ANTLRv4Parser.ACTION, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_actionBlock;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterActionBlock) {
	 		listener.enterActionBlock(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitActionBlock) {
	 		listener.exitActionBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitActionBlock) {
			return visitor.visitActionBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgActionBlockContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public BEGIN_ARGUMENT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.BEGIN_ARGUMENT, 0);
	}
	public END_ARGUMENT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.END_ARGUMENT, 0);
	}
	public ARGUMENT_CONTENT_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.ARGUMENT_CONTENT);
	}
	public ARGUMENT_CONTENT(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.ARGUMENT_CONTENT, i);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_argActionBlock;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterArgActionBlock) {
	 		listener.enterArgActionBlock(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitArgActionBlock) {
	 		listener.exitArgActionBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitArgActionBlock) {
			return visitor.visitArgActionBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModeSpecContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public MODE(): TerminalNode {
		return this.getToken(ANTLRv4Parser.MODE, 0);
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public SEMI(): TerminalNode {
		return this.getToken(ANTLRv4Parser.SEMI, 0);
	}
	public lexerRuleSpec_list(): LexerRuleSpecContext[] {
		return this.getTypedRuleContexts(LexerRuleSpecContext) as LexerRuleSpecContext[];
	}
	public lexerRuleSpec(i: number): LexerRuleSpecContext {
		return this.getTypedRuleContext(LexerRuleSpecContext, i) as LexerRuleSpecContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_modeSpec;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterModeSpec) {
	 		listener.enterModeSpec(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitModeSpec) {
	 		listener.exitModeSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitModeSpec) {
			return visitor.visitModeSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RulesContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ruleSpec_list(): RuleSpecContext[] {
		return this.getTypedRuleContexts(RuleSpecContext) as RuleSpecContext[];
	}
	public ruleSpec(i: number): RuleSpecContext {
		return this.getTypedRuleContext(RuleSpecContext, i) as RuleSpecContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_rules;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterRules) {
	 		listener.enterRules(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitRules) {
	 		listener.exitRules(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitRules) {
			return visitor.visitRules(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RuleSpecContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public parserRuleSpec(): ParserRuleSpecContext {
		return this.getTypedRuleContext(ParserRuleSpecContext, 0) as ParserRuleSpecContext;
	}
	public lexerRuleSpec(): LexerRuleSpecContext {
		return this.getTypedRuleContext(LexerRuleSpecContext, 0) as LexerRuleSpecContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_ruleSpec;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterRuleSpec) {
	 		listener.enterRuleSpec(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitRuleSpec) {
	 		listener.exitRuleSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitRuleSpec) {
			return visitor.visitRuleSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParserRuleSpecContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RULE_REF(): TerminalNode {
		return this.getToken(ANTLRv4Parser.RULE_REF, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(ANTLRv4Parser.COLON, 0);
	}
	public ruleBlock(): RuleBlockContext {
		return this.getTypedRuleContext(RuleBlockContext, 0) as RuleBlockContext;
	}
	public SEMI(): TerminalNode {
		return this.getToken(ANTLRv4Parser.SEMI, 0);
	}
	public exceptionGroup(): ExceptionGroupContext {
		return this.getTypedRuleContext(ExceptionGroupContext, 0) as ExceptionGroupContext;
	}
	public ruleModifiers(): RuleModifiersContext {
		return this.getTypedRuleContext(RuleModifiersContext, 0) as RuleModifiersContext;
	}
	public argActionBlock(): ArgActionBlockContext {
		return this.getTypedRuleContext(ArgActionBlockContext, 0) as ArgActionBlockContext;
	}
	public ruleReturns(): RuleReturnsContext {
		return this.getTypedRuleContext(RuleReturnsContext, 0) as RuleReturnsContext;
	}
	public throwsSpec(): ThrowsSpecContext {
		return this.getTypedRuleContext(ThrowsSpecContext, 0) as ThrowsSpecContext;
	}
	public localsSpec(): LocalsSpecContext {
		return this.getTypedRuleContext(LocalsSpecContext, 0) as LocalsSpecContext;
	}
	public rulePrequel_list(): RulePrequelContext[] {
		return this.getTypedRuleContexts(RulePrequelContext) as RulePrequelContext[];
	}
	public rulePrequel(i: number): RulePrequelContext {
		return this.getTypedRuleContext(RulePrequelContext, i) as RulePrequelContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_parserRuleSpec;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterParserRuleSpec) {
	 		listener.enterParserRuleSpec(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitParserRuleSpec) {
	 		listener.exitParserRuleSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitParserRuleSpec) {
			return visitor.visitParserRuleSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExceptionGroupContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public exceptionHandler_list(): ExceptionHandlerContext[] {
		return this.getTypedRuleContexts(ExceptionHandlerContext) as ExceptionHandlerContext[];
	}
	public exceptionHandler(i: number): ExceptionHandlerContext {
		return this.getTypedRuleContext(ExceptionHandlerContext, i) as ExceptionHandlerContext;
	}
	public finallyClause(): FinallyClauseContext {
		return this.getTypedRuleContext(FinallyClauseContext, 0) as FinallyClauseContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_exceptionGroup;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterExceptionGroup) {
	 		listener.enterExceptionGroup(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitExceptionGroup) {
	 		listener.exitExceptionGroup(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitExceptionGroup) {
			return visitor.visitExceptionGroup(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExceptionHandlerContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public CATCH(): TerminalNode {
		return this.getToken(ANTLRv4Parser.CATCH, 0);
	}
	public argActionBlock(): ArgActionBlockContext {
		return this.getTypedRuleContext(ArgActionBlockContext, 0) as ArgActionBlockContext;
	}
	public actionBlock(): ActionBlockContext {
		return this.getTypedRuleContext(ActionBlockContext, 0) as ActionBlockContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_exceptionHandler;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterExceptionHandler) {
	 		listener.enterExceptionHandler(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitExceptionHandler) {
	 		listener.exitExceptionHandler(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitExceptionHandler) {
			return visitor.visitExceptionHandler(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FinallyClauseContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FINALLY(): TerminalNode {
		return this.getToken(ANTLRv4Parser.FINALLY, 0);
	}
	public actionBlock(): ActionBlockContext {
		return this.getTypedRuleContext(ActionBlockContext, 0) as ActionBlockContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_finallyClause;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterFinallyClause) {
	 		listener.enterFinallyClause(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitFinallyClause) {
	 		listener.exitFinallyClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitFinallyClause) {
			return visitor.visitFinallyClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RulePrequelContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public optionsSpec(): OptionsSpecContext {
		return this.getTypedRuleContext(OptionsSpecContext, 0) as OptionsSpecContext;
	}
	public ruleAction(): RuleActionContext {
		return this.getTypedRuleContext(RuleActionContext, 0) as RuleActionContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_rulePrequel;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterRulePrequel) {
	 		listener.enterRulePrequel(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitRulePrequel) {
	 		listener.exitRulePrequel(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitRulePrequel) {
			return visitor.visitRulePrequel(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RuleReturnsContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RETURNS(): TerminalNode {
		return this.getToken(ANTLRv4Parser.RETURNS, 0);
	}
	public argActionBlock(): ArgActionBlockContext {
		return this.getTypedRuleContext(ArgActionBlockContext, 0) as ArgActionBlockContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_ruleReturns;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterRuleReturns) {
	 		listener.enterRuleReturns(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitRuleReturns) {
	 		listener.exitRuleReturns(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitRuleReturns) {
			return visitor.visitRuleReturns(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ThrowsSpecContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public THROWS(): TerminalNode {
		return this.getToken(ANTLRv4Parser.THROWS, 0);
	}
	public qualifiedIdentifier_list(): QualifiedIdentifierContext[] {
		return this.getTypedRuleContexts(QualifiedIdentifierContext) as QualifiedIdentifierContext[];
	}
	public qualifiedIdentifier(i: number): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, i) as QualifiedIdentifierContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_throwsSpec;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterThrowsSpec) {
	 		listener.enterThrowsSpec(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitThrowsSpec) {
	 		listener.exitThrowsSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitThrowsSpec) {
			return visitor.visitThrowsSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LocalsSpecContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LOCALS(): TerminalNode {
		return this.getToken(ANTLRv4Parser.LOCALS, 0);
	}
	public argActionBlock(): ArgActionBlockContext {
		return this.getTypedRuleContext(ArgActionBlockContext, 0) as ArgActionBlockContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_localsSpec;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLocalsSpec) {
	 		listener.enterLocalsSpec(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLocalsSpec) {
	 		listener.exitLocalsSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLocalsSpec) {
			return visitor.visitLocalsSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RuleActionContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public AT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.AT, 0);
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public actionBlock(): ActionBlockContext {
		return this.getTypedRuleContext(ActionBlockContext, 0) as ActionBlockContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_ruleAction;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterRuleAction) {
	 		listener.enterRuleAction(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitRuleAction) {
	 		listener.exitRuleAction(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitRuleAction) {
			return visitor.visitRuleAction(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RuleModifiersContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ruleModifier_list(): RuleModifierContext[] {
		return this.getTypedRuleContexts(RuleModifierContext) as RuleModifierContext[];
	}
	public ruleModifier(i: number): RuleModifierContext {
		return this.getTypedRuleContext(RuleModifierContext, i) as RuleModifierContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_ruleModifiers;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterRuleModifiers) {
	 		listener.enterRuleModifiers(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitRuleModifiers) {
	 		listener.exitRuleModifiers(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitRuleModifiers) {
			return visitor.visitRuleModifiers(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RuleModifierContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public PUBLIC(): TerminalNode {
		return this.getToken(ANTLRv4Parser.PUBLIC, 0);
	}
	public PRIVATE(): TerminalNode {
		return this.getToken(ANTLRv4Parser.PRIVATE, 0);
	}
	public PROTECTED(): TerminalNode {
		return this.getToken(ANTLRv4Parser.PROTECTED, 0);
	}
	public FRAGMENT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.FRAGMENT, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_ruleModifier;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterRuleModifier) {
	 		listener.enterRuleModifier(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitRuleModifier) {
	 		listener.exitRuleModifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitRuleModifier) {
			return visitor.visitRuleModifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RuleBlockContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ruleAltList(): RuleAltListContext {
		return this.getTypedRuleContext(RuleAltListContext, 0) as RuleAltListContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_ruleBlock;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterRuleBlock) {
	 		listener.enterRuleBlock(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitRuleBlock) {
	 		listener.exitRuleBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitRuleBlock) {
			return visitor.visitRuleBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RuleAltListContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public labeledAlt_list(): LabeledAltContext[] {
		return this.getTypedRuleContexts(LabeledAltContext) as LabeledAltContext[];
	}
	public labeledAlt(i: number): LabeledAltContext {
		return this.getTypedRuleContext(LabeledAltContext, i) as LabeledAltContext;
	}
	public OR_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.OR);
	}
	public OR(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.OR, i);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_ruleAltList;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterRuleAltList) {
	 		listener.enterRuleAltList(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitRuleAltList) {
	 		listener.exitRuleAltList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitRuleAltList) {
			return visitor.visitRuleAltList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LabeledAltContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public alternative(): AlternativeContext {
		return this.getTypedRuleContext(AlternativeContext, 0) as AlternativeContext;
	}
	public POUND(): TerminalNode {
		return this.getToken(ANTLRv4Parser.POUND, 0);
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_labeledAlt;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLabeledAlt) {
	 		listener.enterLabeledAlt(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLabeledAlt) {
	 		listener.exitLabeledAlt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLabeledAlt) {
			return visitor.visitLabeledAlt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LexerRuleSpecContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TOKEN_REF(): TerminalNode {
		return this.getToken(ANTLRv4Parser.TOKEN_REF, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(ANTLRv4Parser.COLON, 0);
	}
	public lexerRuleBlock(): LexerRuleBlockContext {
		return this.getTypedRuleContext(LexerRuleBlockContext, 0) as LexerRuleBlockContext;
	}
	public SEMI(): TerminalNode {
		return this.getToken(ANTLRv4Parser.SEMI, 0);
	}
	public FRAGMENT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.FRAGMENT, 0);
	}
	public optionsSpec(): OptionsSpecContext {
		return this.getTypedRuleContext(OptionsSpecContext, 0) as OptionsSpecContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_lexerRuleSpec;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLexerRuleSpec) {
	 		listener.enterLexerRuleSpec(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLexerRuleSpec) {
	 		listener.exitLexerRuleSpec(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLexerRuleSpec) {
			return visitor.visitLexerRuleSpec(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LexerRuleBlockContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public lexerAltList(): LexerAltListContext {
		return this.getTypedRuleContext(LexerAltListContext, 0) as LexerAltListContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_lexerRuleBlock;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLexerRuleBlock) {
	 		listener.enterLexerRuleBlock(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLexerRuleBlock) {
	 		listener.exitLexerRuleBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLexerRuleBlock) {
			return visitor.visitLexerRuleBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LexerAltListContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public lexerAlt_list(): LexerAltContext[] {
		return this.getTypedRuleContexts(LexerAltContext) as LexerAltContext[];
	}
	public lexerAlt(i: number): LexerAltContext {
		return this.getTypedRuleContext(LexerAltContext, i) as LexerAltContext;
	}
	public OR_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.OR);
	}
	public OR(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.OR, i);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_lexerAltList;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLexerAltList) {
	 		listener.enterLexerAltList(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLexerAltList) {
	 		listener.exitLexerAltList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLexerAltList) {
			return visitor.visitLexerAltList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LexerAltContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public lexerElements(): LexerElementsContext {
		return this.getTypedRuleContext(LexerElementsContext, 0) as LexerElementsContext;
	}
	public lexerCommands(): LexerCommandsContext {
		return this.getTypedRuleContext(LexerCommandsContext, 0) as LexerCommandsContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_lexerAlt;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLexerAlt) {
	 		listener.enterLexerAlt(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLexerAlt) {
	 		listener.exitLexerAlt(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLexerAlt) {
			return visitor.visitLexerAlt(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LexerElementsContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public lexerElement_list(): LexerElementContext[] {
		return this.getTypedRuleContexts(LexerElementContext) as LexerElementContext[];
	}
	public lexerElement(i: number): LexerElementContext {
		return this.getTypedRuleContext(LexerElementContext, i) as LexerElementContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_lexerElements;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLexerElements) {
	 		listener.enterLexerElements(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLexerElements) {
	 		listener.exitLexerElements(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLexerElements) {
			return visitor.visitLexerElements(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LexerElementContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public lexerAtom(): LexerAtomContext {
		return this.getTypedRuleContext(LexerAtomContext, 0) as LexerAtomContext;
	}
	public ebnfSuffix(): EbnfSuffixContext {
		return this.getTypedRuleContext(EbnfSuffixContext, 0) as EbnfSuffixContext;
	}
	public lexerBlock(): LexerBlockContext {
		return this.getTypedRuleContext(LexerBlockContext, 0) as LexerBlockContext;
	}
	public actionBlock(): ActionBlockContext {
		return this.getTypedRuleContext(ActionBlockContext, 0) as ActionBlockContext;
	}
	public QUESTION(): TerminalNode {
		return this.getToken(ANTLRv4Parser.QUESTION, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_lexerElement;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLexerElement) {
	 		listener.enterLexerElement(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLexerElement) {
	 		listener.exitLexerElement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLexerElement) {
			return visitor.visitLexerElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LexerBlockContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.LPAREN, 0);
	}
	public lexerAltList(): LexerAltListContext {
		return this.getTypedRuleContext(LexerAltListContext, 0) as LexerAltListContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.RPAREN, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_lexerBlock;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLexerBlock) {
	 		listener.enterLexerBlock(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLexerBlock) {
	 		listener.exitLexerBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLexerBlock) {
			return visitor.visitLexerBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LexerCommandsContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RARROW(): TerminalNode {
		return this.getToken(ANTLRv4Parser.RARROW, 0);
	}
	public lexerCommand_list(): LexerCommandContext[] {
		return this.getTypedRuleContexts(LexerCommandContext) as LexerCommandContext[];
	}
	public lexerCommand(i: number): LexerCommandContext {
		return this.getTypedRuleContext(LexerCommandContext, i) as LexerCommandContext;
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_lexerCommands;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLexerCommands) {
	 		listener.enterLexerCommands(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLexerCommands) {
	 		listener.exitLexerCommands(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLexerCommands) {
			return visitor.visitLexerCommands(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LexerCommandContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public lexerCommandName(): LexerCommandNameContext {
		return this.getTypedRuleContext(LexerCommandNameContext, 0) as LexerCommandNameContext;
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.LPAREN, 0);
	}
	public lexerCommandExpr(): LexerCommandExprContext {
		return this.getTypedRuleContext(LexerCommandExprContext, 0) as LexerCommandExprContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.RPAREN, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_lexerCommand;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLexerCommand) {
	 		listener.enterLexerCommand(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLexerCommand) {
	 		listener.exitLexerCommand(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLexerCommand) {
			return visitor.visitLexerCommand(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LexerCommandNameContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public MODE(): TerminalNode {
		return this.getToken(ANTLRv4Parser.MODE, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_lexerCommandName;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLexerCommandName) {
	 		listener.enterLexerCommandName(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLexerCommandName) {
	 		listener.exitLexerCommandName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLexerCommandName) {
			return visitor.visitLexerCommandName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LexerCommandExprContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public INT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.INT, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_lexerCommandExpr;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLexerCommandExpr) {
	 		listener.enterLexerCommandExpr(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLexerCommandExpr) {
	 		listener.exitLexerCommandExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLexerCommandExpr) {
			return visitor.visitLexerCommandExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AltListContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public alternative_list(): AlternativeContext[] {
		return this.getTypedRuleContexts(AlternativeContext) as AlternativeContext[];
	}
	public alternative(i: number): AlternativeContext {
		return this.getTypedRuleContext(AlternativeContext, i) as AlternativeContext;
	}
	public OR_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.OR);
	}
	public OR(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.OR, i);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_altList;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterAltList) {
	 		listener.enterAltList(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitAltList) {
	 		listener.exitAltList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitAltList) {
			return visitor.visitAltList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AlternativeContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public elementOptions(): ElementOptionsContext {
		return this.getTypedRuleContext(ElementOptionsContext, 0) as ElementOptionsContext;
	}
	public element_list(): ElementContext[] {
		return this.getTypedRuleContexts(ElementContext) as ElementContext[];
	}
	public element(i: number): ElementContext {
		return this.getTypedRuleContext(ElementContext, i) as ElementContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_alternative;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterAlternative) {
	 		listener.enterAlternative(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitAlternative) {
	 		listener.exitAlternative(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitAlternative) {
			return visitor.visitAlternative(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public labeledElement(): LabeledElementContext {
		return this.getTypedRuleContext(LabeledElementContext, 0) as LabeledElementContext;
	}
	public ebnfSuffix(): EbnfSuffixContext {
		return this.getTypedRuleContext(EbnfSuffixContext, 0) as EbnfSuffixContext;
	}
	public atom(): AtomContext {
		return this.getTypedRuleContext(AtomContext, 0) as AtomContext;
	}
	public ebnf(): EbnfContext {
		return this.getTypedRuleContext(EbnfContext, 0) as EbnfContext;
	}
	public actionBlock(): ActionBlockContext {
		return this.getTypedRuleContext(ActionBlockContext, 0) as ActionBlockContext;
	}
	public QUESTION(): TerminalNode {
		return this.getToken(ANTLRv4Parser.QUESTION, 0);
	}
	public predicateOptions(): PredicateOptionsContext {
		return this.getTypedRuleContext(PredicateOptionsContext, 0) as PredicateOptionsContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_element;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterElement) {
	 		listener.enterElement(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitElement) {
	 		listener.exitElement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitElement) {
			return visitor.visitElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PredicateOptionsContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.LT, 0);
	}
	public predicateOption_list(): PredicateOptionContext[] {
		return this.getTypedRuleContexts(PredicateOptionContext) as PredicateOptionContext[];
	}
	public predicateOption(i: number): PredicateOptionContext {
		return this.getTypedRuleContext(PredicateOptionContext, i) as PredicateOptionContext;
	}
	public GT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.GT, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_predicateOptions;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterPredicateOptions) {
	 		listener.enterPredicateOptions(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitPredicateOptions) {
	 		listener.exitPredicateOptions(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitPredicateOptions) {
			return visitor.visitPredicateOptions(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PredicateOptionContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public elementOption(): ElementOptionContext {
		return this.getTypedRuleContext(ElementOptionContext, 0) as ElementOptionContext;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.ASSIGN, 0);
	}
	public actionBlock(): ActionBlockContext {
		return this.getTypedRuleContext(ActionBlockContext, 0) as ActionBlockContext;
	}
	public INT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.INT, 0);
	}
	public STRING_LITERAL(): TerminalNode {
		return this.getToken(ANTLRv4Parser.STRING_LITERAL, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_predicateOption;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterPredicateOption) {
	 		listener.enterPredicateOption(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitPredicateOption) {
	 		listener.exitPredicateOption(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitPredicateOption) {
			return visitor.visitPredicateOption(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LabeledElementContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.ASSIGN, 0);
	}
	public PLUS_ASSIGN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.PLUS_ASSIGN, 0);
	}
	public atom(): AtomContext {
		return this.getTypedRuleContext(AtomContext, 0) as AtomContext;
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_labeledElement;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLabeledElement) {
	 		listener.enterLabeledElement(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLabeledElement) {
	 		listener.exitLabeledElement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLabeledElement) {
			return visitor.visitLabeledElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EbnfContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public block(): BlockContext {
		return this.getTypedRuleContext(BlockContext, 0) as BlockContext;
	}
	public blockSuffix(): BlockSuffixContext {
		return this.getTypedRuleContext(BlockSuffixContext, 0) as BlockSuffixContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_ebnf;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterEbnf) {
	 		listener.enterEbnf(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitEbnf) {
	 		listener.exitEbnf(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitEbnf) {
			return visitor.visitEbnf(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockSuffixContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ebnfSuffix(): EbnfSuffixContext {
		return this.getTypedRuleContext(EbnfSuffixContext, 0) as EbnfSuffixContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_blockSuffix;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterBlockSuffix) {
	 		listener.enterBlockSuffix(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitBlockSuffix) {
	 		listener.exitBlockSuffix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitBlockSuffix) {
			return visitor.visitBlockSuffix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EbnfSuffixContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public QUESTION_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.QUESTION);
	}
	public QUESTION(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.QUESTION, i);
	}
	public STAR(): TerminalNode {
		return this.getToken(ANTLRv4Parser.STAR, 0);
	}
	public PLUS(): TerminalNode {
		return this.getToken(ANTLRv4Parser.PLUS, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_ebnfSuffix;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterEbnfSuffix) {
	 		listener.enterEbnfSuffix(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitEbnfSuffix) {
	 		listener.exitEbnfSuffix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitEbnfSuffix) {
			return visitor.visitEbnfSuffix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LexerAtomContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public characterRange(): CharacterRangeContext {
		return this.getTypedRuleContext(CharacterRangeContext, 0) as CharacterRangeContext;
	}
	public terminalDef(): TerminalDefContext {
		return this.getTypedRuleContext(TerminalDefContext, 0) as TerminalDefContext;
	}
	public notSet(): NotSetContext {
		return this.getTypedRuleContext(NotSetContext, 0) as NotSetContext;
	}
	public LEXER_CHAR_SET(): TerminalNode {
		return this.getToken(ANTLRv4Parser.LEXER_CHAR_SET, 0);
	}
	public wildcard(): WildcardContext {
		return this.getTypedRuleContext(WildcardContext, 0) as WildcardContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_lexerAtom;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterLexerAtom) {
	 		listener.enterLexerAtom(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitLexerAtom) {
	 		listener.exitLexerAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitLexerAtom) {
			return visitor.visitLexerAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AtomContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public terminalDef(): TerminalDefContext {
		return this.getTypedRuleContext(TerminalDefContext, 0) as TerminalDefContext;
	}
	public ruleref(): RulerefContext {
		return this.getTypedRuleContext(RulerefContext, 0) as RulerefContext;
	}
	public notSet(): NotSetContext {
		return this.getTypedRuleContext(NotSetContext, 0) as NotSetContext;
	}
	public wildcard(): WildcardContext {
		return this.getTypedRuleContext(WildcardContext, 0) as WildcardContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_atom;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterAtom) {
	 		listener.enterAtom(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitAtom) {
	 		listener.exitAtom(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitAtom) {
			return visitor.visitAtom(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WildcardContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DOT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.DOT, 0);
	}
	public elementOptions(): ElementOptionsContext {
		return this.getTypedRuleContext(ElementOptionsContext, 0) as ElementOptionsContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_wildcard;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterWildcard) {
	 		listener.enterWildcard(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitWildcard) {
	 		listener.exitWildcard(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitWildcard) {
			return visitor.visitWildcard(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NotSetContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public NOT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.NOT, 0);
	}
	public setElement(): SetElementContext {
		return this.getTypedRuleContext(SetElementContext, 0) as SetElementContext;
	}
	public blockSet(): BlockSetContext {
		return this.getTypedRuleContext(BlockSetContext, 0) as BlockSetContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_notSet;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterNotSet) {
	 		listener.enterNotSet(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitNotSet) {
	 		listener.exitNotSet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitNotSet) {
			return visitor.visitNotSet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockSetContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.LPAREN, 0);
	}
	public setElement_list(): SetElementContext[] {
		return this.getTypedRuleContexts(SetElementContext) as SetElementContext[];
	}
	public setElement(i: number): SetElementContext {
		return this.getTypedRuleContext(SetElementContext, i) as SetElementContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.RPAREN, 0);
	}
	public OR_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.OR);
	}
	public OR(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.OR, i);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_blockSet;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterBlockSet) {
	 		listener.enterBlockSet(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitBlockSet) {
	 		listener.exitBlockSet(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitBlockSet) {
			return visitor.visitBlockSet(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SetElementContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TOKEN_REF(): TerminalNode {
		return this.getToken(ANTLRv4Parser.TOKEN_REF, 0);
	}
	public elementOptions(): ElementOptionsContext {
		return this.getTypedRuleContext(ElementOptionsContext, 0) as ElementOptionsContext;
	}
	public STRING_LITERAL(): TerminalNode {
		return this.getToken(ANTLRv4Parser.STRING_LITERAL, 0);
	}
	public characterRange(): CharacterRangeContext {
		return this.getTypedRuleContext(CharacterRangeContext, 0) as CharacterRangeContext;
	}
	public LEXER_CHAR_SET(): TerminalNode {
		return this.getToken(ANTLRv4Parser.LEXER_CHAR_SET, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_setElement;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterSetElement) {
	 		listener.enterSetElement(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitSetElement) {
	 		listener.exitSetElement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitSetElement) {
			return visitor.visitSetElement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.LPAREN, 0);
	}
	public altList(): AltListContext {
		return this.getTypedRuleContext(AltListContext, 0) as AltListContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.RPAREN, 0);
	}
	public COLON(): TerminalNode {
		return this.getToken(ANTLRv4Parser.COLON, 0);
	}
	public optionsSpec(): OptionsSpecContext {
		return this.getTypedRuleContext(OptionsSpecContext, 0) as OptionsSpecContext;
	}
	public ruleAction_list(): RuleActionContext[] {
		return this.getTypedRuleContexts(RuleActionContext) as RuleActionContext[];
	}
	public ruleAction(i: number): RuleActionContext {
		return this.getTypedRuleContext(RuleActionContext, i) as RuleActionContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_block;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterBlock) {
	 		listener.enterBlock(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitBlock) {
	 		listener.exitBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitBlock) {
			return visitor.visitBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class RulerefContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RULE_REF(): TerminalNode {
		return this.getToken(ANTLRv4Parser.RULE_REF, 0);
	}
	public argActionBlock(): ArgActionBlockContext {
		return this.getTypedRuleContext(ArgActionBlockContext, 0) as ArgActionBlockContext;
	}
	public elementOptions(): ElementOptionsContext {
		return this.getTypedRuleContext(ElementOptionsContext, 0) as ElementOptionsContext;
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_ruleref;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterRuleref) {
	 		listener.enterRuleref(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitRuleref) {
	 		listener.exitRuleref(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitRuleref) {
			return visitor.visitRuleref(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CharacterRangeContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public STRING_LITERAL_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.STRING_LITERAL);
	}
	public STRING_LITERAL(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.STRING_LITERAL, i);
	}
	public RANGE(): TerminalNode {
		return this.getToken(ANTLRv4Parser.RANGE, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_characterRange;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterCharacterRange) {
	 		listener.enterCharacterRange(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitCharacterRange) {
	 		listener.exitCharacterRange(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitCharacterRange) {
			return visitor.visitCharacterRange(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TerminalDefContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public TOKEN_REF(): TerminalNode {
		return this.getToken(ANTLRv4Parser.TOKEN_REF, 0);
	}
	public elementOptions(): ElementOptionsContext {
		return this.getTypedRuleContext(ElementOptionsContext, 0) as ElementOptionsContext;
	}
	public STRING_LITERAL(): TerminalNode {
		return this.getToken(ANTLRv4Parser.STRING_LITERAL, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_terminalDef;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterTerminalDef) {
	 		listener.enterTerminalDef(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitTerminalDef) {
	 		listener.exitTerminalDef(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitTerminalDef) {
			return visitor.visitTerminalDef(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementOptionsContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.LT, 0);
	}
	public elementOption_list(): ElementOptionContext[] {
		return this.getTypedRuleContexts(ElementOptionContext) as ElementOptionContext[];
	}
	public elementOption(i: number): ElementOptionContext {
		return this.getTypedRuleContext(ElementOptionContext, i) as ElementOptionContext;
	}
	public GT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.GT, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_elementOptions;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterElementOptions) {
	 		listener.enterElementOptions(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitElementOptions) {
	 		listener.exitElementOptions(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitElementOptions) {
			return visitor.visitElementOptions(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementOptionContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public qualifiedIdentifier(): QualifiedIdentifierContext {
		return this.getTypedRuleContext(QualifiedIdentifierContext, 0) as QualifiedIdentifierContext;
	}
	public identifier(): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, 0) as IdentifierContext;
	}
	public ASSIGN(): TerminalNode {
		return this.getToken(ANTLRv4Parser.ASSIGN, 0);
	}
	public STRING_LITERAL(): TerminalNode {
		return this.getToken(ANTLRv4Parser.STRING_LITERAL, 0);
	}
	public INT(): TerminalNode {
		return this.getToken(ANTLRv4Parser.INT, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_elementOption;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterElementOption) {
	 		listener.enterElementOption(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitElementOption) {
	 		listener.exitElementOption(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitElementOption) {
			return visitor.visitElementOption(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public RULE_REF(): TerminalNode {
		return this.getToken(ANTLRv4Parser.RULE_REF, 0);
	}
	public TOKEN_REF(): TerminalNode {
		return this.getToken(ANTLRv4Parser.TOKEN_REF, 0);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_identifier;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterIdentifier) {
	 		listener.enterIdentifier(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitIdentifier) {
	 		listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedIdentifierContext extends ParserRuleContext {
	constructor(parser?: ANTLRv4Parser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public identifier_list(): IdentifierContext[] {
		return this.getTypedRuleContexts(IdentifierContext) as IdentifierContext[];
	}
	public identifier(i: number): IdentifierContext {
		return this.getTypedRuleContext(IdentifierContext, i) as IdentifierContext;
	}
	public DOT_list(): TerminalNode[] {
	    	return this.getTokens(ANTLRv4Parser.DOT);
	}
	public DOT(i: number): TerminalNode {
		return this.getToken(ANTLRv4Parser.DOT, i);
	}
    public get ruleIndex(): number {
    	return ANTLRv4Parser.RULE_qualifiedIdentifier;
	}
	public enterRule(listener: ANTLRv4ParserListener): void {
	    if(listener.enterQualifiedIdentifier) {
	 		listener.enterQualifiedIdentifier(this);
		}
	}
	public exitRule(listener: ANTLRv4ParserListener): void {
	    if(listener.exitQualifiedIdentifier) {
	 		listener.exitQualifiedIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ANTLRv4ParserVisitor<Result>): Result {
		if (visitor.visitQualifiedIdentifier) {
			return visitor.visitQualifiedIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
