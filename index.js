const XRegExp = require('xregexp')
const stopwords = require('stopwords-json/stopwords-all.json')
const { Stemmer, Languages } = require('multilingual-stemmer')
const ChineseTokenizer = require('chinese-tokenizer').loadFile(__dirname+'/node_modules/chinese-tokenizer/tests/cedict_ts.u8')

const stopwordMap = {}

for (const lang in stopwords) {
	const langMap = stopwordMap[lang] = {}
	const stopwordLang = stopwords[lang]
	stopwordLang.forEach(stopword => langMap[stopword] = true)
}

const charsets = [
	{
		name: "Latin",
		match: XRegExp('\\p{Latin}+', 'g'),
		languages: [
			{ name: "English",    stemmer: new Stemmer(Languages.English),    stopwords:stopwordMap.en },
			{ name: "French",     stemmer: new Stemmer(Languages.French),     stopwords:stopwordMap.fr },
			{ name: "German",     stemmer: new Stemmer(Languages.German),     stopwords:stopwordMap.de },
			{ name: "Danish",     stemmer: new Stemmer(Languages.Danish),     stopwords:stopwordMap.da },
			{ name: "Dutch",      stemmer: new Stemmer(Languages.Dutch),      stopwords:stopwordMap.nl },
			{ name: "Hungarian",  stemmer: new Stemmer(Languages.Hungarian),  stopwords:stopwordMap.hu },
			{ name: "Italian",    stemmer: new Stemmer(Languages.Italian),    stopwords:stopwordMap.it },
			{ name: "Portuguese", stemmer: new Stemmer(Languages.Portuguese), stopwords:stopwordMap.pt },
			{ name: "Romanian",   stemmer: new Stemmer(Languages.Romanian),   stopwords:stopwordMap.ro },
			{ name: "Spanish",    stemmer: new Stemmer(Languages.Spanish),    stopwords:stopwordMap.es },
			{ name: "Swedish",    stemmer: new Stemmer(Languages.Swedish),    stopwords:stopwordMap.sv },
			{ name: "Turkish",    stemmer: new Stemmer(Languages.Turkish),    stopwords:stopwordMap.tr },
		]
	},
	{
		name: "Tamil",
		match: XRegExp('\\p{Tamil}+', 'g'),
		languages: [
			{ name: "Tamil", stemmer: new Stemmer(Languages.Tamil) }
		]
	},
	{
		name: "Greek",
		match: XRegExp('\\p{Greek}+', 'g'),
		languages: [
			{ name: "Greek", stemmer: new Stemmer(Languages.Greek), stopwords: stopwordMap.el },
		]
	},
	{
		name: "Arabic",
		match: XRegExp('\\p{Arabic}+', 'g'),
		languages: [
			{ name: "Arabic", stemmer: new Stemmer(Languages.Arabic), stopwords: stopwordMap.ar },
		]
	},
	{
		name: "Cyrillic",
		match: XRegExp('\\p{Cyrillic}+', 'g'),
		languages: [
			{ name: "russian", stemmer:new Stemmer(Languages.Russian), stopwords:stopwordMap.ru },
		]
	},
	{
		name: "Katakana",
		match: XRegExp('\\p{katakana}+', 'g')
	},
	{
		name: "Han",
		tokenizer: (word) => ChineseTokenizer(word).map(token => token.text),
		match: XRegExp('\\p{Han}+', 'g'),
		language: [
			{ name: "Mandarin", stopwords: stopwordMap.zh },
		]
	},
	{
		name: "Hangul",
		match: XRegExp('\\p{Hangul}+', 'g'),
		languages: [
			{ name: "korean", stopwords: stopwordMap.ko }
		]
	}
]


function parse(string) {
	string = string.toLowerCase()

	const charsetMatches = charsets.map(charset => {
		const { tokenizer, match, languages = [] } = charset

		let charsetMatch = string.match(charset.match)
		if (! charsetMatch) return []

		if (tokenizer)
			charsetMatch = [].concat(charsetMatch.map(tokenizer))

		for (const language of languages) {
			const { stopwords } = language
			if (! stopwords) continue;
			charsetMatch = charsetMatch.filter(word => !stopwords[word])
		}

		const stems = charsetMatch.map(word => {
			let stem = word

			for (const language of languages) {
				const { stemmer } = language
				if (! stemmer) continue;
				const thisStem = stemmer.stem(word)
				stem = thisStem.length < stem.length ? thisStem : stem
			}

			return stem
		})

		return [].concat(...stems)

	})

	return [].concat(...charsetMatches)
}

module.exports = parse
