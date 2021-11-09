import {
  Grid, List, ListItem, ListItemAvatar, Typography, Box, TablePagination, ListSubheader, Button, Divider
} from '@material-ui/core';
import React from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';

const products = [
  {
    id: uuid(),
    name: 'Java Developer (All Levels) - Up to $2k',
    imageUrl: '/static/images/products/product_1.png',
    salary: '800 - 2,000 USD',
    topReasons: ['Flexible working time, no OT', 'KPI Incentive~15monthly salary', 'Premium Insurance for Family'],
    company: { name: 'Dropbox', address: 'Tòa nhà Thành Công, 80 Dịch Vọng Hậu, Cau Giay, Ha Noi' },
    description: 'We are seeking a motivated Technical Architect (Java/NodeJs)  who is passionate about great quality digital products and willing to work on the entire stack, from DevOps, API to front-end and even testing automation. You love solving problems, have the ability to work independently but even better in a team and you have a strong thirst to learn new technology and frameworks. We are looking for great team players that share their knowledge and are willing to do what it takes to deliver.',
    aboutOurTeam: 'Our team is responsible for creating a brand of new digital financial platforms and apps that are highly reliable and scalable using modern engineering practices. You will be joining a project which talented software engineers in our Digital Bank Build team who is responsible for designing, building and maintaining the new digital banking platform and the customer channels. As part of the team, you will be responsible for implementing software features, involve in technical designs and writing tests to ensure the high quality delivery of the product. The teams operate in Scrum and DevOps model. We\'re looking for top engineers out there! During the interview process we will test your coding and design skills to assess your experience and depth of knowledge. Don\'t worry our interview process will be fun!',
    responsibilities: [
      'As a backend engineer, you will be working within a specific problem where you will design, develop, and deploy backend services with a focus on scalability, high availability, and low latency.',
      'Solving complex technical and business problems and learn new technology and frameworks',
      'Be part of a team that will take full responsibility for the features you own.',
      'Design, develop, test, deploy, monitor and improve, you are responsible for the full life-cycle of your product – build it, own it.'
    ],
    mustHaveSkills: [
      'A pragmatic mindset.',
      'Outstanding problem-solving ability, eagerness to learn, and curiosity.',
      'A few years of software development experience with one or more general-purpose programming languages.',
      'Strong database and schema design for large-scale application.',
      'Adaptable attitude and personality that is ready for continuous change.',
      'Collaboration and culture fit in Agile experience will be an advantage.',
      'Good English reading and writing skills',
      'Experience working in the banking and the financial domain is a plus'
    ],
    niceToHaveSkills: [
      'Experience in developing distributed systems on top of micro-services architecture, event-driven architecture using Java, Spring and Sprint boot, Kafka, Redis, etc. is a big plus',
      'Experience in AWS, Ansible, Packer, Docker, Rancher, K8s is a big plus',
      'Experienced in automated testing frameworks is a plus',
      'Good English listening and speaking is a big plus'
    ],
    whyYouWillLove: 'We pride ourselves on being cutting edge and stretching the limits of all our personnel - whether you are a mobile engineer, in quality assurance or a technical lead architect in our team. Our engineering teams form a cohesive, collaborative and motivated community that delivers innovative solutions to our businesses in Asia and Africa.',
    benefits: [
      'Meal and parking allowance covered by company.',
      'Full benefits and salary rank during probation.',
      'Insurances as Vietnamese labor law and premium health care for you and your family.',
      'SMART goals and clear career opportunities (technical seminar, conference and career talk) - we focus on your development.',
      'Values driven, international working environment and agile culture.',
      'Overseas travel opportunities for training and working related.',
      'Internal Hackathons and company\'s events (team building, coffee run, blue card...)',
      'Pro-Rate and performance bonus.',
      '15-day annual + 3-day sick leave per year from company.',
      'Work-life balance 40-hr per week from Mon to Fri.'
    ],
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Senior Java Developer (Spring/OOP)',
    imageUrl: '/static/images/products/product_2.png',
    salary: '1,800 - 2,400 USD',
    topReasons: ['Premium health care package', 'Flexible working hours', 'Hot Sign-in Bonus'],
    company: { name: 'Medium Corporation', address: 'Tòa nhà Thành Công, 80 Dịch Vọng Hậu, Cau Giay, Ha Noi' },
    description: 'You will make plans, manage human & other resources to implement projects and ensure projects are delivered on-time. In addition, you will also communicate with customers and solve problems arising during project execution.',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: 'Frontend (Angular/ReactJS/JavaScript)',
    imageUrl: '/static/images/products/product_3.png',
    salary: 'Up to 2.000 usd',
    topReasons: ['Bonus based on performance', 'Career path opportunities', 'Professional, friendly'],
    company: { name: 'Slack', address: 'Tòa nhà Thành Công, 80 Dịch Vọng Hậu, Cau Giay, Ha Noi' },
    description: 'You will make plans, manage human & other resources to implement projects and ensure projects are delivered on-time. In addition, you will also communicate with customers and solve problems arising during project execution.',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: 'Front-end Developer',
    imageUrl: '/static/images/products/product_4.png',
    salary: '1,500 - 3,000 USD',
    topReasons: ['Sign on bonus to all level (*)', 'Macbook Pro provided', 'Great healthcare packages'],
    company: { name: 'Lyft', address: 'Tòa nhà Thành Công, 80 Dịch Vọng Hậu, Cau Giay, Ha Noi' },
    description: 'You will make plans, manage human & other resources to implement projects and ensure projects are delivered on-time. In addition, you will also communicate with customers and solve problems arising during project execution.',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: '/static/images/products/product_5.png',
    salary: '800 - 2,000 USD',
    topReasons: ['Flexible working time, no OT', 'KPI Incentive~15monthly salary', 'Premium Insurance for Family'],
    company: { name: 'Github', address: 'Tòa nhà Thành Công, 80 Dịch Vọng Hậu, Cau Giay, Ha Noi' },
    description: 'You will make plans, manage human & other resources to implement projects and ensure projects are delivered on-time. In addition, you will also communicate with customers and solve problems arising during project execution.',
    updatedAt: moment().subtract(9, 'hours')
  }
];

const currentJob = products[0];

const JobStudentView = () => {
  console.log(currentJob);
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Box>
          <List sx={{
            padding: 0,
            direction: 'rtl',
            width: '100%',
            height: 750,
            overflow: 'auto',
            overflowX: 'hidden',
            backgroundColor: '#fdfdfd',
            borderRadius: '6px',
            boxShadow: '0 4px 28px rgba(123,151,158,.25)',
            border: '1px solid #d6dee1',
            '&::-webkit-scrollbar': {
              width: 10,
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
              borderRadius: '5px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'darkgrey',
              outline: '1px solid slategrey',
              borderRadius: '5px'
            },
          }}
          >
            {products.map((product, i) => (
              <ListItem
                divider={i < products.length - 1}
                key={product.id}
                sx={{ direction: 'ltr' }}
              >
                <ListItemAvatar>
                  <img
                    alt={product.name}
                    src={product.imageUrl}
                    style={{
                      height: 48,
                      width: 48
                    }}
                  />
                </ListItemAvatar>
                <Box>
                  <Typography variant="h4">
                    {product.name}
                  </Typography>
                  <Typography variant="h5">
                    {product.salary}
                  </Typography>
                  <List>
                    {product.topReasons.map((reason) => (
                      <ListItem>
                        <Typography>{reason}</Typography>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </ListItem>
            ))}
          </List>
          <TablePagination
            component="div"
            count={5}
            // onPageChange={handlePageChange}
            // onRowsPerPageChange={handleLimitChange}
            page={0}
            rowsPerPage={10}
            rowsPerPageOptions={[10, 20, 50]}
          />
        </Box>
      </Grid>
      <Grid item xs={8}>
        <List sx={{
          padding: 0,
          width: '100%',
          height: 750,
          overflow: 'auto',
          overflowX: 'hidden',
          backgroundColor: '#fdfdfd',
          borderRadius: '6px',
          boxShadow: '0 4px 28px rgba(123,151,158,.25)',
          border: '1px solid #d6dee1',
          '&::-webkit-scrollbar': {
            width: 10,
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
            borderRadius: '5px'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'darkgrey',
            outline: '1px solid slategrey',
            borderRadius: '5px'
          },
        }}
        >
          <ListSubheader sx={{
            borderRadius: '6px 0 0 0',
            boxShadow: '0 4px 28px rgba(123,151,158,.25)',
            border: '1px solid #d6dee1',
          }}
          >
            <Box sx={{ padding: 2 }}>
              <Typography variant="h2" sx={{ color: 'black' }}>{currentJob.name}</Typography>
              <Typography variant="h4">{currentJob.company.name}</Typography>
            </Box>
            <Divider />
            <Box sx={{ textAlign: 'center' }}>
              <Button variant="contained" sx={{ width: '80%' }}>Apply Now</Button>
            </Box>
          </ListSubheader>
          <Box sx={{ paddingLeft: 4, paddingRight: 4 }}>
            <Box sx={{ paddingTop: 2 }}>
              <Typography variant="h5">{currentJob.salary}</Typography>
              <Typography>{currentJob.company.address}</Typography>
            </Box>
            <Divider />
            <Box sx={{ paddingTop: 2 }}>
              <Typography variant="h4">Top 3 Reasons To Join Us</Typography>
              <List>
                {currentJob.topReasons.map((reason) => (
                  <ListItem>
                    <Typography>{reason}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider />
            <Box sx={{ paddingTop: 2 }}>
              <Typography variant="h4">Job Description</Typography>
              <Typography>{currentJob.description}</Typography>
            </Box>
            <Divider />
            <Box sx={{ paddingTop: 2 }}>
              <Typography variant="h4">About our team</Typography>
              <Typography>{currentJob.aboutOurTeam}</Typography>
            </Box>
            <Divider />
            <Box sx={{ paddingTop: 2 }}>
              <Typography variant="h4">Responsibilities</Typography>
              <List>
                {currentJob.responsibilities.map((responsibility) => (
                  <ListItem>
                    <Typography>{responsibility}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Divider />
            <Box sx={{ paddingTop: 2 }}>
              <Typography variant="h4">Your Skills and Experience</Typography>
              <Box sx={{ paddingTop: 2 }}>
                <Typography variant="h5">Must have:</Typography>
                <List>
                  {currentJob.mustHaveSkills.map((skill) => (
                    <ListItem>
                      <Typography>{skill}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box sx={{ paddingTop: 2 }}>
                <Typography variant="h5">Nice to have:</Typography>
                <List>
                  {currentJob.niceToHaveSkills.map((skill) => (
                    <ListItem>
                      <Typography>{skill}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ paddingTop: 2 }}>
              <Typography variant="h4">Why You&apos;ll Love Working Here</Typography>
              <Typography>{currentJob.whyYouWillLove}</Typography>
            </Box>
            <Box sx={{ paddingTop: 2 }}>
              <Typography variant="h4">Some of our benefits:</Typography>
              <List>
                {currentJob.benefits.map((benefit) => (
                  <ListItem>
                    <Typography>{benefit}</Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        </List>
      </Grid>
    </Grid>
  );
};

export default JobStudentView;
