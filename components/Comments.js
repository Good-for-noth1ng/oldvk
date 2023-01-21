import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import Comment from './Comment'
import uuid from 'react-native-uuid'
import { useSelector } from 'react-redux'

const Comments = ({owner_id, post_id}) => {
  
  
  return (
    <FlatList 
      data={comments}
      renderItem={renderComment}
      showsVerticalScrollIndicator={true}
      initialNumToRender={6}
    />
  )
}

export default Comments

const styles = StyleSheet.create({})