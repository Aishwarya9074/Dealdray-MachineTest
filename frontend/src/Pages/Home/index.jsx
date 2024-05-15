import React from 'react';
import Navbar from '../../Components/Navbar';
// import EmployeeList from '../../Components/EmployeeList';
import './home.css';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="homepage">
        <section className="intro">
          <h1>Welcome to the Company Portal</h1>
          <p>
            Welcome to our company portal where you can find the latest updates,
            company news, and information about our employees. We are committed
            to fostering a collaborative and inclusive environment.
          </p>
        </section>
        
        <section className="news">
          <h2>Company News</h2>
          <div className="news-item">
            <h3>Q1 Financial Results</h3>
            <p>
              We are pleased to share our financial results for the first quarter.
              Our company has seen a 20% increase in revenue compared to last year.
            </p>
          </div>
          <div className="news-item">
            <h3>Upcoming Events</h3>
            <p>
              Join us for our annual company retreat in June. It's a great opportunity
              to connect with colleagues and engage in team-building activities.
            </p>
          </div>
        </section>

        
        <footer className="footer">
          <p>&copy; 2024 Dealdray. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
