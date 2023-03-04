import { Text } from "react-native"
import React from "react"
import { COLORS } from "../constants/theme"
import uuid from 'react-native-uuid';

export const getHyperlinkInText = (comment) => {
  const wordsList = comment.split(' ')
  const userPatternWithComma = /^\[id\d*\|.*\]\,$/ //   text.match(/\[club\d*\|.*\]/)
  const userPattern = /^\[id\d*\|.*\]$/
  const communityPatternWithComma = /^\[club\d*\|.*\]\,$/
  const communityPattern = /^\[club\d*\|.*\]$/
  let updatedWordsList = []
  let variablesForFormatting = []
  for (let i = 0; i < wordsList.length; i++) {
    if (userPatternWithComma.test(wordsList[i]) || userPattern.test(wordsList[i])) {
      let idPart = wordsList[i].split('|')[0]
      let namePart = wordsList[i].split('|')[1]
      let id = idPart.split('[')[1]
      let name = namePart.split(']')[0]
      if (userPatternWithComma.test(wordsList[i])) {
        updatedWordsList.push(<Text key={uuid.v4()} style={{color: COLORS.primary}}>{name}</Text>)
        updatedWordsList.push(', ')
      } else {
        updatedWordsList.push(<Text key={uuid.v4()} style={{color: COLORS.primary}}>{name}</Text>)
      }
    } else if (communityPattern.test(wordsList[i]) || communityPatternWithComma.test(wordsList[i])) {
      let idPart = wordsList[i].split('|')[0]
      let namePart = wordsList[i].split('|')[1]
      let id = idPart.split('[')[1]
      let name = namePart.split(']')[0]
      if (communityPatternWithComma.test(wordsList[i])) {
        updatedWordsList.push(<Text key={uuid.v4()} style={{color: COLORS.primary}}>{name}</Text>)
        updatedWordsList.push(', ')
      } else {
        updatedWordsList.push(<Text key={uuid.v4()} style={{color: COLORS.primary}}>{name} </Text>)
      }
    } else {
      updatedWordsList.push(wordsList[i])
      updatedWordsList.push(' ')
    }
  }
  return updatedWordsList
}