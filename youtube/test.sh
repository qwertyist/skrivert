#!/usr/bin/env bash
post_cc() {
  python3 youtube_ingest_cc_url.py $YOUTUBEENDPOINT $1 "$2"
}
post_cc 52 'Frågan'
post_cc 53 'är'
post_cc 54 'om'
post_cc 55 'det'
post_cc 56 'blir någon'
post_cc 57 'skillnad'
post_cc 58 'beroende på om'
post_cc 59 'jag'
post_cc 60 'skickar'
post_cc 61 'en'
post_cc 62 'eller'
post_cc 63 'flera'
post_cc 64 'ord i samma block'
post_cc 65 'eller om det inte spelar någon roll alls'
post_cc 66 'hur många tecken det är i min undertext'
sleep 1 
post_cc 67 'men får jag infoga text på ny rad då?'
