import axios from 'axios';

export async function verifyCaptcha(token: string): Promise<boolean> {
  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', {
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token
    });
    
    return (response.data as any).success;
  } catch (error) {
    console.error('CAPTCHA verification failed:', error);
    return false;
  }
}

export function generateMathCaptcha(): { question: string; answer: number } {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  const operations = ['+', '-', '*'];
  const operation = operations[Math.floor(Math.random() * operations.length)];
  
  let question: string;
  let answer: number;
  
  switch (operation) {
    case '+':
      question = `${num1} + ${num2} = ?`;
      answer = num1 + num2;
      break;
    case '-':
      question = `${num1} - ${num2} = ?`;
      answer = num1 - num2;
      break;
    case '*':
      question = `${num1} × ${num2} = ?`;
      answer = num1 * num2;
      break;
    default:
      question = `${num1} + ${num2} = ?`;
      answer = num1 + num2;
  }
  
  return { question, answer };
}

export function verifyMathCaptcha(userAnswer: number, correctAnswer: number): boolean {
  return userAnswer === correctAnswer;
}
