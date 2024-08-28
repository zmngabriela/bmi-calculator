import { useEffect, useState } from "react"
import styles from './Form.module.css'

const Form = () => {
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [bmi, setBmi] = useState(0);
    const [calculating, setCalculating] = useState(false);
    const [classification, setClassification] = useState('');
    const [scale, setScale] = useState('');

    useEffect(() => {
        if (height > 0 && weight > 0) {
            const calc = weight / (height * height);
            setBmi(calc);

            if (calc < 18.5) {
                setClassification('You are underweight.');
                setScale(styles.low);
            } if (calc >= 18.5 && calc <= 24.9) {
                setClassification('You are at a normal weight.');
                setScale(styles.normal);
            } if (calc >= 25 && calc <= 29.9) {
                setClassification('You are overweight.');
                setScale(styles.high);
            } if (calc >= 30 && calc <= 34.9) {
                setClassification('You have obesity class I.');
                setScale(styles.obesity1);
            } if (calc >= 35 && calc <= 39.9) {
                setClassification('You have obesity class II.');
                setScale(styles.obesity2);
            } if (calc >= 40) {
                setClassification('You have obesity class III.');
                setScale(styles.obesity3);
            }
            setCalculating(true);
        }
    }, [height, weight]);

    return (
        <>
            <header>
                <h1>BMI Calculator</h1>
            </header>
            <form>
                <input onBlur={e => setHeight(parseFloat(e.target.value))} type="number" placeholder="Height. E.g.: 1.60" />
                <input onBlur={e => setWeight(parseFloat(e.target.value))} type="number" placeholder="Weight" />
            </form>
            {calculating ? (
                <>
                    <p>Your BMI is: <b>{bmi.toFixed(2)}</b></p>
                    <h3>Classification in the table:</h3>
                    <p className={scale}>{classification}</p>
                </>
            ) : <p>Please, enter your height and weight to calculate the BIM.</p>}
        </>
    )
}

export default Form;