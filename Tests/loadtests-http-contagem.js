// Extensao para exportacao para JUnit e outras solucoes:
// https://github.com/grafana/awesome-k6
import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { jUnit, textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
    thresholds: {
        http_req_duration: ['avg < 120'],
        http_req_failed: ['rate < 0.05']
    }    
};

export default function() {
    http.get('#{EndpointTests}#');
    sleep(1);
};

export function handleSummary(data) {
    return {
      "loadtests.html": htmlReport(data),
      "loadtests-results.xml": jUnit(data),
      stdout: textSummary(data, { indent: " ", enableColors: true })
    };
}