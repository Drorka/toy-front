import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadToys } from '../store/toy.action'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

import { LabelsCountChart } from '../cmps/dashboard-labels-count'
import { LabelsPriceChart } from '../cmps/dashboard-labels-price'

ChartJS.register(ArcElement, Tooltip, Legend)

export function ToyDashboard() {
	const toys = useSelector((storeState) => storeState.toyModule.toys)

	useEffect(() => {
		loadToys()
	}, [])

	function getChartsData() {
		const chartsData = toys.reduce(
			(acc, toy) => {
				toy.labels.forEach((label) => {
					acc.labelsCountMap[label] = acc.labelsCountMap[label]
						? ++acc.labelsCountMap[label]
						: 1
					acc.labelsPriceMap[label] = acc.labelsPriceMap[label]
						? (acc.labelsPriceMap[label] += toy.price)
						: toy.price
				})
				return acc
			},
			{ labelsCountMap: {}, labelsPriceMap: {} }
		)
		Object.keys(chartsData.labelsPriceMap).forEach(
			(label) =>
				(chartsData.labelsPriceMap[label] /= chartsData.labelsCountMap[label])
		)

		return chartsData
	}

	const { labelsPriceMap, labelsCountMap } = getChartsData()

	return (
		<section className="toy-dashboard flex">
			<LabelsCountChart dataMap={labelsCountMap} />
			<LabelsPriceChart dataMap={labelsPriceMap} />{' '}
		</section>
	)
}
