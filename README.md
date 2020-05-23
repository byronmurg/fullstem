# fullstem
Simple text search reduction

## Usage
```javascript
const fullstem = require('fullstem')

fullstem('My hotel is near that Straße sign')
// [ 'hotel', 'straß', 'sig' ]

fullstem("こにちは、アプリの作りはどうか？")
// [ 'アプリ', '作' ]

fullstem("我喜欢在海边。")
// [ '喜欢', '海边' ]

fullstem('Доброе утро')
// [ 'добр' ]

fullstem('أحب أن أكون بجانب البحر')
// [ 'أحب', 'أن', 'أكون', 'جانب', 'بحر' ]

fullstem('Μου αρέσει να είμαι δίπλα στην παραλία')
// [ 'μ', 'αρεσ', 'ειμα', 'διπλ', 'παραλ' ]

fullstem('Szeretek a tengerpart mellett lenni')
// [ 'szeret', 'tengerpar' ]

fullstem('Mi piace stare vicino al mare')
// [ 'pia', 'sta', 'ma' ]

fullstem('Sahilin yanında olmayı severim')
// [ 'sahil', 'yan', 'olma', 'sever' ]

fullstem('나는 해변 옆에 있고 싶어')
// [ '나는', '해변', '옆에', '있고', '싶어' ]

fullstem('நான் கடலோரப் பக்கத்தில் இருக்க விரும்புகிறேன்')
// [ 'நான்', 'கடலோர', 'பக்கம்', 'இர்', 'விரும்பு' ]
```

## Suported languages

- English
- French
- German
- Danish
- Dutch
- Hungarian
- Italian
- Portuguese
- Romanian
- Spanish
- Swedish
- Turkish
- Tamil
- Greek
- Arabic
- Russian
- Japanese
- Chinese (simplified)
- Korean*

## Multilingual Behaviour
Fullstem works by splitting out individual character scripts and then processing each potental language for each match.

This can produce unexpected (but not unintended) behaviour in certain circumstances.

For example:
`I can't get enough ministrone soup!`

Would yield:
`[ "soup", "minestro" ]`

So you can see how multi-language sentences can be searched in either language, but that may lead to invalid search hits where a word occurs in two languages.

Now consider Japanese kanji and Chinese han.

If we use the Japanese sentence `国際の空港に飛行機を見た` roughly "I saw an aeroplane at the international airport",
would give the result `["国","際","空","港","飛行","機","見"]` which is correct for a Japanese search but might yield interesting results for Mandarin searches. The exact cross-over depends on the context but ambiguity arises from the fact that many Japanese words are borrowed from Chinese but have archaic spellings.

## Korean
The stemmer is a work in progress. Current behaviour is to pull out any hangul words and strip stopwords.

# Improvement
If you have any suggestions for improvement please get in touch or submit a merge-request. I do not know many of the
languages used here so cannot know for sure their effectiveness.

# Acknowledgements
This software would not be possible without any of the fantastic work done in it's dependencies. Please check them out on the npm [dependencies page](https://www.npmjs.com/package/fullstem?activeTab=dependencies).
