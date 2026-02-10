function whatKolobokDoneAfterMet(character: any) {
  switch (character) {
    case 'дедушка': { console.log('Я от дедушки ушел') };
    break
    case 'лиса': { console.log('Меня съели') };
    break
    case 'заяц': { console.log('Мне нечего тебе предложить ушастый странник') };
    break
  }
}

function newYearCalling(character: any) {
  switch (character) {
    case 'Дед Мороз': { console.log(`${character}! `.repeat(3)) };
    break
    case 'Снегурочка': { console.log(`${character}! `.repeat(3)) };
    break
  }
}