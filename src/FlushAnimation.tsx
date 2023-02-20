import { useState } from 'react';
import { motion, useAnimationControls} from "framer-motion";
import './FlushAnimation.css';
import flushButtonSvg from './svg/flushButton.svg';
import wsveSvg from './svg/wave.svg'
import flushMp3 from './mp3/flushSound.mp3';

interface Props {
  logs: string[];
  clear_logs: () => void;
}

function FlushAnimation(props: Props) {

  const waveControls = useAnimationControls();
  const logControls = useAnimationControls();
  const bgControls = useAnimationControls();
  const flushSound = new Audio(flushMp3);

  //アニメーションの開始、終了の状態を保持
  const [startAnimation, set_sartAnimation] = useState<boolean>(false);

  //ログが画面上部から下りてくるアニメーションの処理
  const log_sequence = async () => {
    bgControls.start({
        clipPath: `circle(${window.innerHeight * 2}px at right 27px bottom 120px)`,
        transition: {
          type: "spring",
          stiffness: 50,
          restDelta: 2
        }
      }
    );

    await logControls.start({
      top: "100%",
      transition: {
        duration: 6,
        ease: "linear",
        delay: 0.5
      }
    });

    await logControls.start({ display: "none"})
    props.clear_logs();
    bgControls.start({
        clipPath: "circle(25px at right 27px bottom 120px)",
        transition: {
          type: "easeIn",
        }
      }
    );

    return await logControls.start({
      top: "",
      transition: {
        duration: 1,
        ease: "linear"
      },
      transitionEnd: {
        display: "block",
      }
    });
  }

  //波がが画面下部からせりあがってくるアニメーションの処理
  const wave_sequence = async () => {
    await waveControls.start({height: "300px"});

    await waveControls.start({
      top: "70%",
      transition: {
        duration: 1,
        delay: 0.5
      }
    });

    await waveControls.start({
      top: ["70%", "80%", "70%"],
      transition: {
        repeat: 2,
        repeatType: "loop",
        duration: 2
      }
    });

    await waveControls.start({
      top: "100%",
      transition: { duration: 2 }
    });

    set_sartAnimation(false);
  }

  return (
    <>
      <motion.div animate={bgControls}
        className='Animation-background'
        initial={{ clipPath: "circle(25px at right 27px bottom 120px)"}}
      />

      <button
        className='Animation-flushButton' type="button"
        disabled={startAnimation}
        onClick= {() => {
          set_sartAnimation(true);
          flushSound.play();
          log_sequence();
          wave_sequence();
        }}
      ><img src={flushButtonSvg} alt="flushButton" /></button>

      <motion.div className='Animation-log'
        animate={logControls}
        initial={{ bottom: "100%"}}
      >
        <ul>
          { props.logs.map((value, index) => {
              return(
                <li key={index}>{value}</li>
              )
          })}
        </ul>
      </motion.div>

      <motion.img className='Animation-wave'
        src={wsveSvg}
        animate={waveControls}
        initial={{ top: "100%"}}
      />

    </>
  );
}

export default FlushAnimation;
