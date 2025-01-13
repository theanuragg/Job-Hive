'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { CheckCircle, Circle } from 'lucide-react'

// Update the getRoadmapData function in RoadmapView.jsx

const getRoadmapData = (id) => {
    const roadmaps = {
      frontend: {
        title: 'Frontend Development',
        description: 'Complete guide to becoming a frontend developer',
        sections: [
          {
            title: 'HTML Fundamentals',
            items: [
              'HTML5 Basics',
              'Semantic HTML',
              'Forms and Validation',
              'SEO Basics',
              'Accessibility'
            ]
          },
          {
            title: 'CSS Essentials',
            items: [
              'CSS Fundamentals',
              'Flexbox',
              'Grid',
              'Responsive Design',
              'CSS Animations'
            ]
          },
          {
            title: 'JavaScript Core',
            items: [
              'JavaScript Basics',
              'DOM Manipulation',
              'ES6+ Features',
              'Async Programming',
              'Error Handling'
            ]
          },
          {
            title: 'Frontend Frameworks',
            items: [
              'React Fundamentals',
              'State Management',
              'Routing',
              'API Integration',
              'Testing'
            ]
          }
        ]
      },
      backend: {
        title: 'Backend Development',
        description: 'Master server-side programming and API development',
        sections: [
          {
            title: 'Programming Fundamentals',
            items: [
              'Data Structures',
              'Algorithms',
              'Object-Oriented Programming',
              'Functional Programming',
              'Design Patterns'
            ]
          },
          {
            title: 'Backend Languages',
            items: [
              'Node.js & Express',
              'Python & Django/Flask',
              'Java & Spring Boot',
              'PHP & Laravel',
              'Go Basics'
            ]
          },
          {
            title: 'Database Management',
            items: [
              'SQL Fundamentals',
              'MongoDB & NoSQL',
              'Database Design',
              'Query Optimization',
              'Data Modeling'
            ]
          },
          {
            title: 'API Development',
            items: [
              'REST API Design',
              'GraphQL',
              'API Security',
              'API Documentation',
              'API Testing'
            ]
          },
          {
            title: 'Server Management',
            items: [
              'Linux Basics',
              'Web Servers (Nginx/Apache)',
              'Caching Strategies',
              'Message Queues',
              'Microservices'
            ]
          }
        ]
      },
      fullstack: {
        title: 'Full Stack Development',
        description: 'Become proficient in both frontend and backend technologies',
        sections: [
          {
            title: 'Frontend Essentials',
            items: [
              'HTML/CSS/JavaScript',
              'React/Vue/Angular',
              'State Management',
              'Responsive Design',
              'Web Performance'
            ]
          },
          {
            title: 'Backend Fundamentals',
            items: [
              'Node.js Ecosystem',
              'Express/NestJS',
              'API Development',
              'Authentication/Authorization',
              'Server Management'
            ]
          },
          {
            title: 'Database Technologies',
            items: [
              'SQL Databases',
              'NoSQL Databases',
              'ORM/ODM',
              'Database Design',
              'Data Migration'
            ]
          },
          {
            title: 'DevOps & Deployment',
            items: [
              'Git Version Control',
              'CI/CD Pipelines',
              'Docker Basics',
              'Cloud Platforms',
              'Monitoring & Logging'
            ]
          },
          {
            title: 'Advanced Concepts',
            items: [
              'System Design',
              'Security Best Practices',
              'Testing Strategies',
              'Performance Optimization',
              'Scalability Patterns'
            ]
          }
        ]
      },
      mobile: {
        title: 'Mobile Development',
        description: 'Build native and cross-platform mobile applications',
        sections: [
          {
            title: 'Mobile Fundamentals',
            items: [
              'Mobile UI/UX Principles',
              'App Lifecycle',
              'Mobile Architecture',
              'State Management',
              'Offline Storage'
            ]
          },
          {
            title: 'React Native',
            items: [
              'React Native Basics',
              'Native Components',
              'Navigation',
              'Device APIs',
              'Performance Optimization'
            ]
          },
          {
            title: 'Native Android',
            items: [
              'Kotlin Fundamentals',
              'Android Studio',
              'Material Design',
              'Android APIs',
              'App Publishing'
            ]
          },
          {
            title: 'Native iOS',
            items: [
              'Swift Basics',
              'Xcode & Interface Builder',
              'UIKit/SwiftUI',
              'iOS APIs',
              'App Store Guidelines'
            ]
          },
          {
            title: 'Advanced Topics',
            items: [
              'Push Notifications',
              'App Security',
              'Analytics Integration',
              'CI/CD for Mobile',
              'App Optimization'
            ]
          }
        ]
      },
      devops: {
        title: 'DevOps Engineering',
        description: 'Learn cloud platforms, CI/CD, and infrastructure automation',
        sections: [
          {
            title: 'Version Control',
            items: [
              'Git Advanced Concepts',
              'Branching Strategies',
              'Git Workflows',
              'Code Review Process',
              'Monorepo Management'
            ]
          },
          {
            title: 'CI/CD',
            items: [
              'Jenkins/GitLab CI',
              'GitHub Actions',
              'Pipeline Design',
              'Automated Testing',
              'Deployment Strategies'
            ]
          },
          {
            title: 'Container Technologies',
            items: [
              'Docker Fundamentals',
              'Kubernetes Basics',
              'Container Orchestration',
              'Service Mesh',
              'Container Security'
            ]
          },
          {
            title: 'Cloud Platforms',
            items: [
              'AWS Services',
              'Azure Fundamentals',
              'GCP Essentials',
              'Cloud Architecture',
              'Cost Optimization'
            ]
          },
          {
            title: 'Infrastructure as Code',
            items: [
              'Terraform',
              'Ansible',
              'CloudFormation',
              'Pulumi',
              'Configuration Management'
            ]
          }
        ]
      },
      security: {
        title: 'Cybersecurity',
        description: 'Master security principles and protect digital assets',
        sections: [
          {
            title: 'Security Fundamentals',
            items: [
              'Security Principles',
              'Cryptography Basics',
              'Network Security',
              'Security Protocols',
              'Authentication Methods'
            ]
          },
          {
            title: 'Application Security',
            items: [
              'OWASP Top 10',
              'Secure Coding Practices',
              'Security Testing',
              'Vulnerability Assessment',
              'Code Analysis'
            ]
          },
          {
            title: 'Network Security',
            items: [
              'Firewall Configuration',
              'VPN Setup',
              'IDS/IPS Systems',
              'Network Monitoring',
              'Traffic Analysis'
            ]
          },
          {
            title: 'Incident Response',
            items: [
              'Incident Handling',
              'Forensics Basics',
              'Malware Analysis',
              'Threat Hunting',
              'Security Automation'
            ]
          },
          {
            title: 'Compliance & Governance',
            items: [
              'Security Frameworks',
              'Compliance Standards',
              'Risk Assessment',
              'Security Policies',
              'Audit Procedures'
            ]
          }
        ]
      }
    }
  
    return roadmaps[id] || null
  }

export default function RoadmapView() {
  const { id } = useParams()
  const [progress, setProgress] = useState({})
  const [overallProgress, setOverallProgress] = useState(0)
  const [openSections, setOpenSections] = useState({})
  const roadmap = getRoadmapData(id || '')

  useEffect(() => {
    const savedProgress = localStorage.getItem(`roadmap-progress-${id}`)
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress))
    }
  }, [id])

  useEffect(() => {
    if (roadmap) {
      const totalItems = roadmap.sections.reduce((acc, section) => acc + section.items.length, 0)
      const completedItems = Object.values(progress).filter(Boolean).length
      setOverallProgress((completedItems / totalItems) * 100)
      
      localStorage.setItem(`roadmap-progress-${id}`, JSON.stringify(progress))
    }
  }, [progress, roadmap, id])

  if (!roadmap) {
    return <div className="p-8 text-center">Roadmap not found</div>
  }

  const toggleProgress = (sectionTitle, item) => {
    const key = `${sectionTitle}-${item}`
    setProgress(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const toggleSection = (sectionIndex) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionIndex]: !prev[sectionIndex]
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {roadmap.title}
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            {roadmap.description}
          </p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Overall Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {roadmap.sections.map((section, index) => (
            <div key={index} className="border rounded-lg bg-white overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left text-xl font-semibold flex justify-between items-center hover:bg-gray-50"
                onClick={() => toggleSection(index)}
              >
                {section.title}
                <span className="transform transition-transform duration-200" style={{
                  transform: openSections[index] ? 'rotate(180deg)' : 'rotate(0deg)'
                }}>
                  ▼
                </span>
              </button>
              {openSections[index] && (
                <div className="space-y-4 p-4">
                  {section.items.map((item, itemIndex) => {
                    const isCompleted = progress[`${section.title}-${item}`]
                    return (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <button
                            className="p-1 rounded-full hover:bg-gray-200"
                            onClick={() => toggleProgress(section.title, item)}
                          >
                            {isCompleted ? (
                              <CheckCircle className="h-6 w-6 text-green-500" />
                            ) : (
                              <Circle className="h-6 w-6 text-gray-400" />
                            )}
                          </button>
                          <span className={isCompleted ? 'line-through text-gray-500' : ''}>
                            {item}
                          </span>
                        </div>
                        <button
                          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(`learn ${item}`)}`, '_blank')}
                        >
                          Learn
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
