import { NextResponse } from 'next/server'

//const TWITTER_BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAEMg2AEAAAAApZw2jPYkHa4c3DwbwHJt52fWUc8%3DIc81cnTB3uYuj1cYDn9s69quq9f7K7cNDb4znZ3W98jMfm7MJh'
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN!
const TWITTER_USERNAME = 'Workersrights24'

export async function GET() {
  try {
    // Step 1: Get the numeric user ID for the username
    const userRes = await fetch(
      `https://api.twitter.com/2/users/by/username/${TWITTER_USERNAME}`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    )
    if (!userRes.ok) {
      throw new Error('Failed to fetch Twitter user ID')
    }
    const userData = await userRes.json()
    const userId = userData.data?.id
    if (!userId) {
      throw new Error('Twitter user ID not found')
    }

    // Step 2: Fetch tweets for the user ID
    const response = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at,public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch tweets')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching tweets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tweets' },
      { status: 500 }
    )
  }
} 