import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { Pie, Bar } from 'react-chartjs-2'
import { useState } from 'react'
import { Chart as ChartJS } from 'chart.js/auto';
import { useLayoutEffect } from 'react'
import { useEffect } from 'react'
import ChangeContext from "../context/ToggleContext";
import { useContext } from 'react'

const PieContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50%;
  background-color: white;
  border-radius: 40px;
  margin-left: 30px;
`
const Title = styled.h1`
    padding: 15px;
    font-weight: 500;
`
const PIEE = styled.div`
  height: fit-content;
  width: auto;
  display: flex;
  align-self: center;
`
const Hr = styled.hr`
  background-color: lightgray;
  border: none;
  height: 3px;
`;

const Chart = () => {
  const { t } = useTranslation();
  const { toggle, setToggle } = useContext(ChangeContext);
  const [graph, setGraph] = useState({
    labels: ["1", "2", "3"],
    datasets: [{
      data: ["1", "2", "3"],
      backgroundColor: [
        "#6a2135",
        "#c13c37",
        "#e38627",
      ],
      borderColor: "black",
      borderWidth: 1,
    }]
  });

  useLayoutEffect(() => {
    selectChart();
  },[])
  useEffect(() => {
    selectChart();
  }, [toggle])



  const selectChart = () => {
    const url = 'https://localhost:7075/api/Subscriptions/GetChartData';

    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(subsFromServer => {

        if (subsFromServer.data != null) {
          const chartData = subsFromServer.data;
          var productName = [];
          var countOf = [];
          chartData?.forEach(element => {
            productName.push(element.productName);
            countOf.push(element.countOf);
          })
          setGraph({
            labels: productName,
            datasets: [{
              data: countOf,
              backgroundColor: [
                "#6a2135",
                "#c13c37",
                "#e38627",
              ],
              borderColor: "black",
              borderWidth: 1,
            }]
          });

        }
      });
  }


  return (
    <PieContainer>
      <Title>{t("spends")}</Title>
      <Hr />
      <PIEE>
        <Pie data={graph} />
      </PIEE>
    </PieContainer>
  )
}

export default Chart
