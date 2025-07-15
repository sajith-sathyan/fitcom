import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import Webcam from 'react-webcam';
import Navbar from '../../component/navBar/Navbar';
import './Style.css';

function Posture() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const detectorRef = useRef(null);
  const isDetectingRef = useRef(false);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [workoutType, setWorkoutType] = useState('DumbbellPress');

  const loadDetector = async () => {
    await tf.ready();
    detectorRef.current = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      }
    );
  };

  const getAngle = (a, b, c) => {
    const ab = { x: b.x - a.x, y: b.y - a.y };
    const cb = { x: b.x - c.x, y: b.y - c.y };
    const dot = ab.x * cb.x + ab.y * cb.y;
    const abLen = Math.sqrt(ab.x ** 2 + ab.y ** 2);
    const cbLen = Math.sqrt(cb.x ** 2 + cb.y ** 2);
    const angle = Math.acos(dot / (abLen * cbLen));
    return angle * (180 / Math.PI);
  };

  const isDumbbellPressCorrect = (keypoints) => {
    const leftShoulder = keypoints.find(k => k.name === 'left_shoulder');
    const rightShoulder = keypoints.find(k => k.name === 'right_shoulder');
    const leftElbow = keypoints.find(k => k.name === 'left_elbow');
    const rightElbow = keypoints.find(k => k.name === 'right_elbow');
    const leftWrist = keypoints.find(k => k.name === 'left_wrist');
    const rightWrist = keypoints.find(k => k.name === 'right_wrist');

    if (
      leftShoulder?.score > 0.5 &&
      rightShoulder?.score > 0.5 &&
      leftElbow?.score > 0.5 &&
      rightElbow?.score > 0.5 &&
      leftWrist?.score > 0.5 &&
      rightWrist?.score > 0.5
    ) {
      const leftAngle = getAngle(leftShoulder, leftElbow, leftWrist);
      const rightAngle = getAngle(rightShoulder, rightElbow, rightWrist);
      const isElbowBent = leftAngle > 70 && leftAngle < 120 && rightAngle > 70 && rightAngle < 120;
      const wristHeightDiff = Math.abs(leftWrist.y - rightWrist.y);
      const isVertical = wristHeightDiff < 50;
      return isElbowBent && isVertical;
    }
    return false;
  };

  const isBicepCurlCorrect = (keypoints) => {
    const leftShoulder = keypoints.find(k => k.name === 'left_shoulder');
    const leftElbow = keypoints.find(k => k.name === 'left_elbow');
    const leftWrist = keypoints.find(k => k.name === 'left_wrist');
    const rightShoulder = keypoints.find(k => k.name === 'right_shoulder');
    const rightElbow = keypoints.find(k => k.name === 'right_elbow');
    const rightWrist = keypoints.find(k => k.name === 'right_wrist');

    if (
      leftShoulder?.score > 0.5 &&
      leftElbow?.score > 0.5 &&
      leftWrist?.score > 0.5 &&
      rightShoulder?.score > 0.5 &&
      rightElbow?.score > 0.5 &&
      rightWrist?.score > 0.5
    ) {
      const leftAngle = getAngle(leftShoulder, leftElbow, leftWrist);
      const rightAngle = getAngle(rightShoulder, rightElbow, rightWrist);
      const leftCurl = leftAngle < 50;
      const rightCurl = rightAngle < 50;
      const leftWristUp = leftWrist.y < leftElbow.y;
      const rightWristUp = rightWrist.y < rightElbow.y;
      return (leftCurl && leftWristUp) || (rightCurl && rightWristUp);
    }
    return false;
  };

  const isShoulderPressCorrect = (keypoints) => {
    const leftShoulder = keypoints.find(k => k.name === 'left_shoulder');
    const leftElbow = keypoints.find(k => k.name === 'left_elbow');
    const leftWrist = keypoints.find(k => k.name === 'left_wrist');
    const rightShoulder = keypoints.find(k => k.name === 'right_shoulder');
    const rightElbow = keypoints.find(k => k.name === 'right_elbow');
    const rightWrist = keypoints.find(k => k.name === 'right_wrist');

    if (
      leftShoulder?.score > 0.5 &&
      leftElbow?.score > 0.5 &&
      leftWrist?.score > 0.5 &&
      rightShoulder?.score > 0.5 &&
      rightElbow?.score > 0.5 &&
      rightWrist?.score > 0.5
    ) {
      const leftArmAngle = getAngle(leftElbow, leftShoulder, { x: leftShoulder.x, y: leftShoulder.y - 100 });
      const rightArmAngle = getAngle(rightElbow, rightShoulder, { x: rightShoulder.x, y: rightShoulder.y - 100 });
      const isArmsVertical = leftArmAngle > 70 && leftArmAngle < 110 && rightArmAngle > 70 && rightArmAngle < 110;
      const isWristAboveElbow = leftWrist.y < leftElbow.y && rightWrist.y < rightElbow.y;
      return isArmsVertical && isWristAboveElbow;
    }
    return false;
  };

  const detectPose = async () => {
    if (!isDetectingRef.current || !webcamRef.current?.video) return;

    if (webcamRef.current.video.readyState === 4 && detectorRef.current) {
      const video = webcamRef.current.video;
      const poses = await detectorRef.current.estimatePoses(video);
      drawCanvas(poses, video);
    }

    requestAnimationFrame(detectPose);
  };

  const drawCanvas = (poses, video) => {
    const ctx = canvasRef.current.getContext('2d');
    canvasRef.current.width = video.videoWidth;
    canvasRef.current.height = video.videoHeight;
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (poses.length > 0) {
      const keypoints = poses[0].keypoints;
      let isCorrect = false;

      if (workoutType === 'DumbbellPress') {
        isCorrect = isDumbbellPressCorrect(keypoints);
      } else if (workoutType === 'BicepCurl') {
        isCorrect = isBicepCurlCorrect(keypoints);
      } else if (workoutType === 'ShoulderPress') {
        isCorrect = isShoulderPressCorrect(keypoints);
      }

      keypoints.forEach((keypoint) => {
        if (keypoint?.score > 0.5) {
          ctx.beginPath();
          ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = isCorrect ? 'lime' : 'red';
          ctx.fill();
        }
      });

      const adjacentPairs = poseDetection.util.getAdjacentPairs(poseDetection.SupportedModels.MoveNet);
      adjacentPairs.forEach(([i, j]) => {
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];
        if (kp1?.score > 0.5 && kp2?.score > 0.5) {
          ctx.beginPath();
          ctx.moveTo(kp1.x, kp1.y);
          ctx.lineTo(kp2.x, kp2.y);
          ctx.strokeStyle = isCorrect ? 'lime' : 'cyan';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      ctx.font = '30px Arial';
      ctx.fillStyle = isCorrect ? 'lime' : 'red';
      ctx.fillText(
        isCorrect
          ? `Correct ${workoutType.replace(/([A-Z])/g, ' $1')}!`
          : '',
        20,
        40
      );
    }
  };

  const start = async () => {
    setIsWebcamOn(true);
    isDetectingRef.current = true;
    await loadDetector();
    detectPose();
  };

  const end = () => {
    isDetectingRef.current = false;
    setIsWebcamOn(false);
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div>
      <Navbar />
      <div className="main-content">
        {isWebcamOn && (
          <Webcam
            ref={webcamRef}
            style={{
              position: 'absolute',
              margin: 'auto',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 9,
              width: 640,
              height: 480,
            }}
          />
        )}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            margin: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 10,
            width: 640,
            height: 480,
          }}
        />
      </div>

      <div style={{ textAlign: 'center', marginTop: 500 }}>
        
        <button style={{ backgroundColor: 'red', marginRight: '20px' }} onClick={start}>Start</button>
        <button style={{ backgroundColor: 'green', marginRight: '20px' }} onClick={end}>End</button>
      </div>

      <div style={{ textAlign: 'center', marginTop: 20 }}>
      <h2 className="workout-title">{workoutType.replace(/([A-Z])/g, ' $1')}</h2>

        <button onClick={() => setWorkoutType('DumbbellPress')} style={{ marginRight: '10px' }}>
          Dumbbell Press
        </button>
        <button onClick={() => setWorkoutType('BicepCurl')} style={{ marginRight: '10px' }}>
          Bicep Curl
        </button>
        <button onClick={() => setWorkoutType('ShoulderPress')}>
          Shoulder Press
        </button>
      </div>
    </div>
  );
}

export default Posture;
