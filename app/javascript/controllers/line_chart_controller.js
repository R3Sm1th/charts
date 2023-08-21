import { Controller } from "@hotwired/stimulus"
import zoomPlugin from "chartjs-plugin-zoom"
import Chart from "chart.js/auto"
import "chartjs-adapter-date-fns"

// Connects to data-controller="line-chart"
export default class extends Controller {
  static values = { url: String }
  static targets = ["canvas"]

  connect() {
    Chart.register(zoomPlugin)
    this.date = new Date().getDate()
    this.fetchData(this.date - 7 * 24 * 60 * 60 * 1000, this.date)
      .then(() => this.intializeChart())
  }
  intializeChart(){
    this.chart= new Chart(this.canvasTarget.getContext("2d"), {
      type: "line",
      data: this.chartData,
      options: {
        scales: {
          x: { type: "time", id: "x-axis"}
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: "x",
            },
            wheel: {
              enabled: true,
            },
            mode: "x",
          }
        }
      }
    })
  }
  fetchData(start_data, end_data){
    let min = start_time || this.chart.options.scales.x.min
    let max = end_time || this.chart.options.scales.x.max
    let params = new URLSearchParams({start_time: min, end_time: max})
    let url = `${this.urlValue}?${params.toString()}`

    return fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
    .then(response => response.json())
    .then(json => {
      this.chartData = {
        datasets: [{ data: json }]
      }
    })

  }
}
