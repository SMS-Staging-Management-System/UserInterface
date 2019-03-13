export const clickerTypes = {
  INCREMENT: 'INCREMENT',
}

export const increment = (amount: number) => {
  return {
    payload: {
      amount
    },
    type: clickerTypes.INCREMENT
  }
}

