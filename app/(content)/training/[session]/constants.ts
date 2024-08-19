const anchors = {
  R0: 'Âncora Rugosidade Ausente',
  R1: 'Âncora Rugosidade Leve',
  R2: 'Âncora Rugosidade Moderada',
  R3: 'Âncora Rugosidade Intensa',
  B0: 'Âncora Soprosidade Ausente',
  B1: 'Âncora Soprosidade Leve',
  B2: 'Âncora Soprosidade Moderada',
  B3: 'Âncora Soprosidade Intensa',
}

const options = {
  roughness: {
    name: 'Rugosidade',
    title:
      'Rugosidade (R): qualquer irregularidade perceptível durante a produção vocal.',
  },
  breathiness: {
    name: 'Soprosidade',
    title: 'Soprosidade (B): qualquer escape de ar audível durante a produção vocal.',
  },
}

export { anchors, options }
