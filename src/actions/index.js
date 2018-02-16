const id = 'URN4QXKCG3QD3Y5MS51A'

export const getLink = (topic, page) =>
  `https://api.idio.co/1.0/topics/${topic}/content?key=${id}&page=${page}&callback=content`