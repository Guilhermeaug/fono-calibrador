import { max, mean, min } from 'simple-statistics'

function forecast(x: number, ky: number[], kx: number[]) {
  if (ky.length !== kx.length) {
    throw new Error('The length of ky and kx must be the same.')
  }

  let i = 0,
    nr = 0,
    dr = 0,
    ax = 0,
    ay = 0,
    a = 0,
    b = 0

  ax = mean(kx)
  ay = mean(ky)

  for (i = 0; i < kx.length; i++) {
    nr += (kx[i] - ax) * (ky[i] - ay)
    dr += (kx[i] - ax) * (kx[i] - ax)
  }

  b = nr / dr
  a = ay - b * ax

  return a + b * x
}

function calculate(values: number[], answer: number) {
  const maxValue = max(values)
  const minValue = min(values)

  let result = 0

  if (answer <= maxValue && answer >= minValue) {
    result += 0
  } else {
    result += 0
  }

  if (answer >= maxValue) {
    result += Math.abs(maxValue - answer)
  } else {
    result += 0
  }

  if (answer <= minValue) {
    result += Math.abs(minValue - answer)
  } else {
    result += 0
  }

  return result
}

function computeScore({
  answer,
  values,
  threshold = 100,
}: {
  answer: number
  values: number[]
  threshold?: number
}) {
  const maxValue = max(values)
  const minValue = min(values)
  const topScore = 100
  const minScore = 0

  const convertedAnswer = calculate(values, answer)
  const diffMaxMin = Math.abs(topScore - maxValue)
  const diffMinMin = Math.abs(minScore - minValue)

  let score = forecast(convertedAnswer, [1, 0], [0, max([diffMaxMin, diffMinMin])])
  score = +(score * 100).toFixed(2)

  const result = score >= threshold ? true : false
  return {
    score,
    result,
  }
}

export { computeScore }
