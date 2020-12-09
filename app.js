var sample = "Insert text here!"
var clean = []
var media = ["code", "words", "art", "audio", "data"]

// Clean input
var cleanWords = sample.split(" ")
for (let i = 0; i < cleanWords.length; i++) {
  cleanWords[i] = cleanWords[i].replace(/\W+/g, "")
  cleanWords[i] = cleanWords[i].toLowerCase()
  clean.push(cleanWords[i])
}

// Create map for Markov, each M word(s) and their possible "next" M words
var map = new Map()
var M = 1
for (let i = 0; i < clean.length - M; i++) {
  let cur = ""
  let next = ""
  for (let j = 0; j < M - 1; j++) {
    cur += clean[i + j] + " "
    next += clean[i + j + 1] + " "
  }
  cur += clean[i + M - 1]
  next += clean[i + M]

  if (!map.has(cur)) {
    map.set(cur, [])
  }
  map.get(cur).push(next)
}

// Get random starting word
var keys = Array.from(map.keys())
var markov = [keys[Math.floor(Math.random() * keys.length)]];

// Complete Markov chain, stopping at four words or ending sequence (whichever first)
for (let i = 0; i < 3; i++) {
  let cur = markov[markov.length - 1]
  if (!map.has(cur)) break
  markov.push(map.get(cur)[Math.floor(Math.random() * map.get(cur).length)])
}

console.log(markov)
