import { motion, useAnimationControls} from "framer-motion";
import './FlushAnimation.css';
import flushButtonSvg from './svg/flushButton.svg';
import wsveSvg from './svg/wave.svg'

interface Props {
  logs: string[];
  resetLogs: () => void;
}

function FlushAnimation(props: Props) {
  const wave_controls = useAnimationControls()
  const log_controls = useAnimationControls()
  const bg_controls = useAnimationControls()

  const log_sequence = async () => {
    bg_controls.start({
        clipPath: `circle(${window.innerHeight * 2}px at right 27px bottom 120px)`,
        transition: {
          type: "spring",
          stiffness: 50,
          restDelta: 2
        }
      }
    );

    await log_controls.start({
      top: "100%",
      transition: {
        duration: 6,
        ease: "linear",
        delay: 0.5
      }
    })

    await log_controls.start({ display: "none"})
    props.resetLogs();
    bg_controls.start({
        clipPath: "circle(25px at right 27px bottom 120px)",
        transition: {
          type: "easeIn",
        }
      }
    );

    return await log_controls.start({
      top: "",
      transition: {
        duration: 1,
        ease: "linear"
      },
      transitionEnd: {
        display: "block",
      }
    })
  }

  const wave_sequence = async () => {
    await wave_controls.start({height: "300px"});

    await wave_controls.start({
      top: "70%",
      transition: {
        duration: 1,
        delay: 0.5
      }
    });

    await wave_controls.start({
      top: ["70%", "80%", "70%"],
      transition: {
        repeat: 2,
        repeatType: "loop",
        duration: 2
      }
    });

    return await wave_controls.start({
      top: "100%",
      transition: { duration: 2 }
    });
  }

  return (
    <>
      <motion.div className='Animation-background'
        initial={{ clipPath: "circle(25px at right 27px bottom 120px)"}}
        animate={bg_controls}
      />

      <button
        className='Animation-flushButton' type="button"
        onClick= {() => {
          log_sequence();
          wave_sequence();
        }}
      ><img src={flushButtonSvg} alt="flushButton" /></button>

      <motion.div className='Animation-log'
        animate={log_controls}
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
        animate={wave_controls}
        initial={{ top: "100%"}}
      />

    </>
  );
}

export default FlushAnimation;
