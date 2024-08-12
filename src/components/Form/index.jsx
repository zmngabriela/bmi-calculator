import { useEffect, useState } from "react"
import styles from './Form.module.css'

const Form = () => {
    const [altura, setAltura] = useState(0);
    const [peso, setPeso] = useState(0);
    const [imc, setImc] = useState(0);
    const [calculando, setCalculando] = useState(false);
    const [Classificacao, setClassificacao] = useState('');
    const [escala, setEscala] = useState('');

    useEffect(() => {
        if (altura > 0 && peso > 0) {
            const calculo = peso / (altura * altura);
            setImc(calculo);

            if (calculo < 18.5) {
                setClassificacao('Voce está abaixo do peso normal.');
                setEscala(styles.baixo);
            } if (calculo >= 18.5 && calculo <= 24.9) {
                setClassificacao('Voce está dentro do peso normal.');
                setEscala(styles.normal);
            } if (calculo >= 25 && calculo <= 29.9) {
                setClassificacao('Voce está em excesso de peso.');
                setEscala(styles.alto);
            } if (calculo >= 30 && calculo <= 34.9) {
                setClassificacao('Voce está em obesidade classe I.');
                setEscala(styles.obesidade1);
            } if (calculo >= 35 && calculo <= 39.9) {
                setClassificacao('Voce está em obesidade classe II.');
                setEscala(styles.obesidade2);
            } if (calculo >= 40) {
                setClassificacao('Voce está em obesidade classe III.');
                setEscala(styles.obesidade3);
            }
            setCalculando(true);
        }
    }, [altura, peso]);

    return (
        <>
            <header>
                <h1>Calculadora IMC</h1>
            </header>
            <form>
                <input onBlur={e => setAltura(parseFloat(e.target.value))} type="number" placeholder="Altura. Ex.: 1.60" />
                <input onBlur={e => setPeso(parseFloat(e.target.value))} type="number" placeholder="Peso" />
            </form>
            {calculando ? (
                <>
                    <p>O seu IMC é: <b>{imc.toFixed(2)}</b></p>
                    <h3>Classificação na tabela:</h3>
                    <p className={escala}>{Classificacao}</p>
                </>
            ) : <p>Por favor, digite a sua altura e peso para calcular o IMC.</p>}
        </>
    )
}

export default Form;