import React, { useState, useEffect } from 'react';

const ShowingDiet = () => {
  const [selectedOption, setSelectedOption] = useState('daily');  // Default to 'daily'

  const handleButtonClick = (option) => {
    setSelectedOption(option);
  };

  const renderCards = (data) => {
    return data.map((item, index) => (
      <div key={index} style={styles.card}>
        <h3 style={styles.cardTitle}>{item.title}</h3>
        <p style={styles.cardContent}>{item.content}</p>
      </div>
    ));
  };

  const dailyData = [
    {
      title: 'Breakfast',
      content: 'Oatmeal with fruits (apple, banana)',
    },
    {
      title: 'Mid-morning Snack',
      content: 'Handful of almonds or yogurt with berries',
    },
    {
      title: 'Lunch',
      content: 'Dal Tadka with a side of mixed vegetables',
    },
    {
      title: 'Afternoon Snack',
      content: 'Paneer Tikka (grilled) with mint chutney',
    },
    {
      title: 'Dinner',
      content: 'Grilled chicken breast or fish with salad',
    },
  ];

  const weeklyData = [
    { title: 'Day 1', content: 'Vegetable Biryani with Raita' },
    { title: 'Day 2', content: 'Chana Masala with whole wheat roti' },
    { title: 'Day 3', content: 'Grilled paneer salad with mixed greens' },
    { title: 'Day 4', content: 'Stir-fried vegetables with quinoa' },
    { title: 'Day 5', content: 'Dal Tadka with brown rice' },
    { title: 'Day 6', content: 'Vegetable soup with grilled chicken breast' },
    { title: 'Day 7', content: 'Whole wheat pasta with marinara sauce and vegetables' },
  ];

  const monthlyData = [
    { title: 'Week 1', content: 'Focus on portion control and balanced meals' },
    { title: 'Week 2', content: 'Increase vegetable intake and reduce carbohydrates' },
    { title: 'Week 3', content: 'Incorporate more lean protein sources like grilled fish and chicken' },
    { title: 'Week 4', content: 'Try intermittent fasting with a focus on hydration and fiber-rich foods' },
  ];

  let dataToRender;
  if (selectedOption === 'daily') {
    dataToRender = dailyData;
  } else if (selectedOption === 'weekly') {
    dataToRender = weeklyData;
  } else if (selectedOption === 'monthly') {
    dataToRender = monthlyData;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.h2}>Personalized Diet Recommendations</h2>
        <p style={styles.p}>Our personalized diet plans are tailored to meet your specific nutritional needs and preferences. Select a time frame to view detailed meal recommendations:</p>
      </div>
      <div style={styles.buttonGroup}>
        <button
          style={selectedOption === 'daily' ? { ...styles.button, ...styles.selected } : styles.button}
          onClick={() => handleButtonClick('daily')}
        >
          Daily
        </button>
        <button
          style={selectedOption === 'weekly' ? { ...styles.button, ...styles.selected } : styles.button}
          onClick={() => handleButtonClick('weekly')}
        >
          Weekly
        </button>
        <button
          style={selectedOption === 'monthly' ? { ...styles.button, ...styles.selected } : styles.button}
          onClick={() => handleButtonClick('monthly')}
        >
          Monthly
        </button>
      </div>
      <div style={styles.cardContainer}>
        {dataToRender && renderCards(dataToRender)}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    marginBottom: '20px',
  },
  h2: {
    color: '#333',
  },
  p: {
    color: '#666',
    fontSize: '16px',
  },
  buttonGroup: {
    marginBottom: '20px',
  },
  button: {
    marginRight: '10px',
    padding: '8px 16px',
    backgroundColor: '#e7e7e7',
    color: 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, color 0.3s',
  },
  selected: {
    backgroundColor: '#4CAF50',
    color: 'white',
  },
  cardContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '16px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    width: 'calc(33.333% - 20px)',
    boxSizing: 'border-box',
  },
  cardTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    color: '#333',
  },
  cardContent: {
    fontSize: '16px',
    color: '#555',
  },
};

export default ShowingDiet;
