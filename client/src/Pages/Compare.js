import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import Chart from 'chart.js/auto';
import '../assets/Compare.css';
import { Link } from 'react-router-dom';

const Compare = ({ voilier }) => {
  const [sailboat1, setSailboat1] = useState('');
  const [sailboat2, setSailboat2] = useState('');
  const [sailboat1Data, setSailboat1Data] = useState(null);
  const [sailboat2Data, setSailboat2Data] = useState(null);
  const [sailboatOptions, setSailboatOptions] = useState([]);
  const chartRef = useRef(null);
  const chartRef1 = useRef(null);

  useEffect(() => {
    // Fetch sailboat names from the server and update the options
    const fetchSailboatNames = async () => {
      try {
        const response = await fetch('http://localhost:5000/voiliers/names');
        const data = await response.json();
        setSailboatOptions(data.names);
      } catch (error) {
        console.log('Error fetching sailboat names:', error);
      }
    };

    fetchSailboatNames();
  }, []);

  useEffect(() => {
    if (sailboat1Data && sailboat2Data) {
      const ctx = chartRef.current.getContext('2d');

      // Destroy the existing chart if it exists
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Convert Length values to numeric format
      const sailboat1Length = parseFloat(sailboat1Data.Longueur);
      const sailboat2Length = parseFloat(sailboat2Data.Longueur);

      chartRef.current.chart = new Chart(ctx, {
        type: 'doughnut', // or 'pie'
        data: {
          labels: ['Sailboat 1', 'Sailboat 2'],
          datasets: [
            {
              label: 'Length',
              data: [sailboat1Length, sailboat2Length],
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          width: 300,
          height: 300,
        },
      });
    }
  }, [sailboat1Data, sailboat2Data]);
  useEffect(() => {
    if (sailboat1Data && sailboat2Data) {
      const ctx = chartRef1.current.getContext('2d');

      // Destroy the existing chart if it exists
      if (chartRef1.current.chart) {
        chartRef1.current.chart.destroy();
      }

      chartRef1.current.chart = new Chart(ctx, {
        type: 'doughnut', // or 'pie'
        data: {
          labels: ['Sailboat 1', 'Sailboat 2'],
          datasets: [
            {
              label: 'Visitors',
              data: [sailboat1Data.visitors, sailboat2Data.visitors],
              backgroundColor: [
                'rgba(75, 192, 192, 0.2)',
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          width: 300,
          height: 300,
        },
      });
    }
  }, [sailboat1Data, sailboat2Data]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const sailboat1Data = await fetch(
        `http://localhost:5000/voiliers/name/${sailboat1}`
      );
      const sailboat2Data = await fetch(
        `http://localhost:5000/voiliers/name/${sailboat2}`
      );

      if (!sailboat1Data.ok || !sailboat2Data.ok) {
        throw new Error('Failed to fetch sailboat data');
      }

      const boat1Json = await sailboat1Data.json();
      const boat2Json = await sailboat2Data.json();

      // Store the fetched sailboat data in state
      setSailboat1Data(boat1Json);
      setSailboat2Data(boat2Json);

      // Reset the input fields
      setSailboat1('');
      setSailboat2('');
    } catch (error) {
      console.log('Error fetching sailboat data:', error);
    }
  };

  return (
    <div>
      <h2 className="title">Compare Sailboats</h2>
      <div className="Compare">
        <Form onSubmit={handleSearchSubmit}>
          <div>
            <Form.Group controlId="sailboat1">
              <Form.Label>Sailboat:</Form.Label>
              <Typeahead
                id="sailboat1Typeahead"
                options={sailboatOptions}
                selected={sailboat1 ? [sailboat1] : []}
                onChange={(selected) => setSailboat1(selected[0] || '')}
                onInputChange={(input) => setSailboat1(input)}
                placeholder="Search for a sailboat..."
              />
            </Form.Group>
          </div>

          <div>
            <Form.Group controlId="sailboat2">
              <Form.Label>Sailboat:</Form.Label>
              <Typeahead
                id="sailboat2Typeahead"
                options={sailboatOptions}
                selected={sailboat2 ? [sailboat2] : []}
                onChange={(selected) => setSailboat2(selected[0] || '')}
                onInputChange={(input) => setSailboat2(input)}
                placeholder="Search for a sailboat..."
              />
            </Form.Group>
          </div>

          <Button variant="primary" type="submit" className="compare-button">
            Compare
          </Button>
        </Form>
      </div>

      {sailboat1Data && sailboat2Data && (
        <div className="SailboatInfo">
          <Card
            style={{
              width: '20%',
            }}
            className="m-3 hover-shadow"
          >
            <Link
              to={`/voiliers/${sailboat1Data._id}`}
              className="link-no-decoration"
            >
              <Card.Img
                variant="top"
                src={require(`../images/${sailboat1Data.Image}`)}
                alt={sailboat1Data.Nom}
              />
            </Link>
            <Card.Title>Sailboat 1:</Card.Title>
            <Card.Text>Name: {sailboat1Data.Nom}</Card.Text>
            <Card.Text>Price: {sailboat1Data.Prix}</Card.Text>
          </Card>

          <Card
            style={{
              width: '20%',
            }}
            className="m-3 hover-shadow"
          >
            <Link
              to={`/voiliers/${sailboat2Data._id}`}
              className="link-no-decoration"
            >
              <Card.Img
                variant="top"
                src={require(`../images/${sailboat2Data.Image}`)}
                alt={sailboat2Data.Nom}
              />
            </Link>
            <Card.Title>Sailboat 2:</Card.Title>
            <Card.Text>Name: {sailboat2Data.Nom}</Card.Text>
            <Card.Text>Price: {sailboat2Data.Prix}</Card.Text>
          </Card>
        </div>
      )}
      <div className="charts">
        <div id="chartContainer">
          <canvas id="comparisonChart" ref={chartRef}></canvas>
        </div>
        <div id="chartContainer">
          <canvas id="comparisonChart" ref={chartRef1}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Compare;
