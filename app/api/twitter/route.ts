import { NextResponse } from 'next/server'

//const TWITTER_BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAEMg2AEAAAAApZw2jPYkHa4c3DwbwHJt52fWUc8%3DIc81cnTB3uYuj1cYDn9s69quq9f7K7cNDb4znZ3W98jMfm7MJh'
const TWITTER_BEARER_TOKEN = process.env.TWITTER_BEARER_TOKEN!
const TWITTER_USERNAME = 'Workersrights24'

export async function GET() {
  try {
    // Step 1: Get user ID from username
    const userRes = await fetch(
      `https://api.twitter.com/2/users/by/username/${TWITTER_USERNAME}`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    if (!userRes.ok) {
      const err = await userRes.json().catch(() => ({}));
      console.error('User fetch error (status ' + userRes.status + '):', err);
      return NextResponse.json({ error: 'Failed to fetch user', details: err }, { status: 500 });
    }

    const userData = await userRes.json();

    if (!userData?.data?.id) {
      // Sometimes Twitter returns error object instead of data
      console.error('User data missing or malformed:', userData);
      return NextResponse.json({ error: 'User data missing', details: userData }, { status: 500 });
    }

    const userId = userData.data.id;

    // Step 2: Fetch tweets for that user ID
    const tweetsRes = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=4&tweet.fields=created_at,text,public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${TWITTER_BEARER_TOKEN}`,
        },
      }
    );

    if (!tweetsRes.ok) {
      const err = await tweetsRes.json().catch(() => ({}));
      console.error('Tweets fetch error (status ' + tweetsRes.status + '):', err);
      return NextResponse.json({ error: 'Failed to fetch tweets', details: err }, { status: 500 });
    }

    const tweets = await tweetsRes.json();
    return NextResponse.json(tweets);
  } catch (error) {
    console.error('Twitter route error:', error);
    return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
  }
}