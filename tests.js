const fullstem = require('./index.js')

function logAndParse(text) {
	const start = Date.now()
	const stems = fullstem(text)
	console.log("Time ", Date.now() - start)
	console.log(`fullstem("${text}")`)
	console.log(`// ${JSON.stringify(stems)}`)
}

logAndParse("Hello there! How are you? Any more deployments?")
logAndParse("こにちは、アプリの作りはどうか？")
logAndParse('Доброе утро')
logAndParse('我喜欢在海边')
logAndParse('My hotel in near that Straße sign')
logAndParse('أحب أن أكون بجانب البحر')
logAndParse('Μου αρέσει να είμαι δίπλα στην παραλία')
logAndParse('Szeretek a tengerpart mellett lenni')
logAndParse('Mi piace stare vicino al mare')
logAndParse('Sahilin yanında olmayı severim')
logAndParse('나는 해변 옆에 있고 싶어')
logAndParse('நான் கடலோரப் பக்கத்தில் இருக்க விரும்புகிறேன்')

logAndParse("I can't get enough ministrone soup")
logAndParse("国際の空港に飛行機を見た")
