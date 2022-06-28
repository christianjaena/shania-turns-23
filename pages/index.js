import { useReward } from 'react-rewards';
import styles from '../styles/Home.module.css';
import Confetti from 'react-confetti';
import Image from 'next/image';
import MovingText from 'react-moving-text';

import Jett from '../public/jett.png';
import Sage from '../public/sage.webp';
import KoreanHappyBirthdayAudio from '../public/Happy Birthday (Korean Version).mp3';

import useWindowDimensions from '../helpers/useWindowDimensions';
import { useState, useEffect } from 'react';

export default function Home() {
  const { reward: emojiReward, isAnimating: isEmojiAnimating } = useReward(
    'emojiReward',
    'emoji',
    { lifetime: 1750 }
  );
  const { reward: balloonsReward, isAnimating: isBalloonsAnimating } =
    useReward('balloonsReward', 'balloons', { lifetime: 1750 });

  const { reward } = useReward('rewardId', 'balloons');

  const [audio, setAudio] = useState(null);

  useEffect(() => {
    setAudio(new Audio(KoreanHappyBirthdayAudio));
  }, []);

  const playMusic = () => {
    audio.play();
  };

  const { width, height } = useWindowDimensions();

  const isAnimating = isEmojiAnimating || isBalloonsAnimating;

  return (
    <div>
      {isAnimating && (
        <Confetti className={styles.confetti} height={height} width={width} />
      )}
      <div className={styles.content}>
        <div>
          {isAnimating && (
            <h1>
              <MovingText
                type='bounce'
                duration='2500ms'
                delay='0s'
                direction='normal'
                timing='ease'
                fillMode='none'
              >
                HAPPY BIRTHDAY BB!!!
              </MovingText>
            </h1>
          )}
        </div>
        <div>
          <button
            disabled={isAnimating}
            onClick={() => {
              emojiReward();
              balloonsReward();
              playMusic();
            }}
          >
            <span id='emojiReward' />
            <span id='balloonsReward' />
            {isAnimating ? (
              <Image src={Sage} alt='sage' />
            ) : (
              <Image src={Jett} alt='jett' />
            )}
          </button>
        </div>
        {isAnimating && (
          <div style={{ paddingTop: '25px' }}>
            <h1 className='balloon' onClick={reward}>
              <span id='rewardId' />
              🎈
            </h1>
          </div>
        )}
      </div>
      <style jsx global>{`
        ${isAnimating
          ? 'body {background: lightpink;} button {background-color: #fff;}'
          : 'body {background: darkslategray;}'}
      `}</style>
    </div>
  );
}
