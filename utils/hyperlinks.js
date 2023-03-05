import { Text } from "react-native"
import React from "react"
import { COLORS } from "../constants/theme"
import uuid from 'react-native-uuid';

const getNameFromHyperlink = (str) => {
  let idPart = str.split('|')[0]
  let namePart =  str.split('|')[1]
  let name = namePart.split(']')[0]
  return name
}
const findUrls = (wordsList, needsToBeSplited = false) => {
  const urlPattern = /(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*))|(#[^\s]*)/
  let updatedWordsList = []
  // console.log(wordsList)
  // return wordsList
  for (let i = 0; i < wordsList.length; i++) {
    if(typeof wordsList[i] === 'string') {
      let splitedWordsList = wordsList[i].split(' ')
      for (let j = 0; j < splitedWordsList.length; j++) {
        if (urlPattern.test(splitedWordsList[j])) {
          updatedWordsList.push(<Text key={uuid.v4()} style={{color: COLORS.primary}}>{splitedWordsList[j]} </Text>)
        } else {
          updatedWordsList.push(splitedWordsList[j])
          updatedWordsList.push(' ')
        }
      }
    } else {
      updatedWordsList.push(wordsList[i])
    }
  }
  return updatedWordsList
}

export const getHyperlinkInText = (comment) => {
  const apropriateStrings = comment.match(/(\[id\d*\|[^\]]*\])|(\[club\d*\|[^\]]*\])|(\[https:\/\/[^\s\)]*\|[^\]]*\])/g)
  let wordsList = []
  let text = comment
  if (apropriateStrings !== null) {
    let numOfApropriateStrings = apropriateStrings.length
    for (let i = 0; i < numOfApropriateStrings; i++) {
      let indexOfHyperlinkStart = text.search(/(\[id\d*\|[^\]]*\])|(\[club\d*\|[^\]]*\])|(\[https:\/\/[^\s\)]*\|[^\]]*\])/) //(\[https:\/\/[^\s\)]*\|[^\]]*\])
      wordsList.push(text.slice(0, indexOfHyperlinkStart))
      wordsList.push(<Text style={{color: COLORS.primary}} key={uuid.v4()}>{getNameFromHyperlink(apropriateStrings[i])}</Text>)
      text = text.slice(indexOfHyperlinkStart + apropriateStrings[i].length, text.length)
      if (i === apropriateStrings.length - 1) {
        wordsList.push(text)
      }
    }
    // console.log(wordsList)
    return findUrls(wordsList)
  }
  const result = findUrls(comment.split(' ')) 
  return result
  
}