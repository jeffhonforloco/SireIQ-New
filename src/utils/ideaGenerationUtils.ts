
interface Idea {
  title: string;
  description: string;
}

interface IdeaSets {
  fitness: Idea[];
  food: Idea[];
  tech: Idea[];
  fashion: Idea[];
  education: Idea[];
  default: Idea[];
}

// Enhanced function to generate campaign ideas based on the product and context
export const generateCampaignIdeas = (
  productName: string, 
  industryType: string = '', 
  context: string = ''
): Idea[] => {
  const productLower = productName.toLowerCase();
  const industryLower = industryType.toLowerCase();
  
  const ideasSet: IdeaSets = {
    fitness: [
      {
        title: "30 Days, New You Challenge",
        description: "A monthly program where users track improvements in key metrics, sharing progress with a supportive community."
      },
      {
        title: "Smart Sleep Revolution",
        description: "Campaign focusing on how the tracker's sleep metrics can transform users' rest quality and overall wellbeing."
      },
      {
        title: "Data-Driven Fitness Series",
        description: "Educational content showing how small, measured improvements lead to significant health outcomes over time."
      },
      {
        title: "Move More, Live Better",
        description: "Showcase real stories of users whose lives changed through consistent activity tracking and goal setting."
      },
      {
        title: "Fitness Metrics That Matter",
        description: "Highlight how your product measures the specific data points that lead to meaningful health improvements."
      }
    ],
    food: [
      {
        title: "Flavor Journey Challenge",
        description: "Weekly subscription introducing customers to new global flavors with accompanying cultural stories."
      },
      {
        title: "From Farm to Table Stories",
        description: "Campaign highlighting the journey of ingredients and the farmers behind your food."
      },
      {
        title: "Quick Gourmet at Home",
        description: "Series showing how your product transforms ordinary meals into extraordinary dining experiences in minutes."
      },
      {
        title: "Seasonal Celebrations",
        description: "Limited-time offerings that celebrate seasonal ingredients and traditions from around the world."
      },
      {
        title: "Taste Lab Experiments",
        description: "Interactive content where customers can vote on new flavor combinations and product innovations."
      }
    ],
    tech: [
      {
        title: "Life Simplified",
        description: "Show how your technology removes friction from everyday tasks, giving users back valuable time."
      },
      {
        title: "Future-Proof Your World",
        description: "Campaign demonstrating how your technology adapts and grows with users' changing needs over time."
      },
      {
        title: "Tech That Understands You",
        description: "Highlight personalization features that make users feel the product was designed specifically for them."
      },
      {
        title: "Connected Living Series",
        description: "Showcase how your product integrates seamlessly with other devices to create a complete ecosystem."
      },
      {
        title: "Innovation Spotlights",
        description: "Focus on the breakthrough features that set your technology apart from competitors in the market."
      }
    ],
    fashion: [
      {
        title: "Express Your True Self",
        description: "Campaign focusing on personal style as an extension of identity and self-expression."
      },
      {
        title: "Sustainable Style Movement",
        description: "Highlight eco-friendly materials and ethical manufacturing processes behind your fashion items."
      },
      {
        title: "Wardrobe Revolution",
        description: "Show how versatile pieces can transform and adapt to different settings and occasions."
      },
      {
        title: "Heritage Meets Modern",
        description: "Storytelling that connects traditional craftsmanship with contemporary design elements."
      },
      {
        title: "Fashion For All",
        description: "Inclusive campaign featuring diverse models and body types wearing your products."
      }
    ],
    education: [
      {
        title: "Knowledge Unlocked",
        description: "Campaign showing how your educational product removes barriers to learning for diverse audiences."
      },
      {
        title: "Learn Your Way",
        description: "Highlight personalized learning paths that adapt to individual student needs and pace."
      },
      {
        title: "Real-World Results",
        description: "Showcase success stories of people who have transformed their careers through your educational platform."
      },
      {
        title: "Skill Building Journey",
        description: "Visual progression of skill development from beginner to expert using your educational tools."
      },
      {
        title: "Community of Learners",
        description: "Focus on the collaborative aspects and supportive community surrounding your educational product."
      }
    ],
    default: [
      {
        title: `${productName} Revolution`,
        description: `Campaign showcasing how ${productName} is changing the industry standards and improving customer experience.`
      },
      {
        title: `The ${productName} Experience`,
        description: `Immersive content series highlighting different ways ${productName} enhances users' daily lives.`
      },
      {
        title: `${productName} Community Spotlights`,
        description: `Feature real customer stories and creative ways they're using ${productName} to solve problems.`
      },
      {
        title: `Reimagining ${productName}`,
        description: `Forward-looking campaign about future innovations and the evolution of ${productName} in the market.`
      },
      {
        title: `Behind the Scenes of ${productName}`,
        description: `Documentary-style content showing the craftsmanship and expertise that goes into creating ${productName}.`
      }
    ]
  };
  
  // Determine which category to use
  let categoryIdeas = ideasSet.default;
  
  if (productLower.includes('fitness') || productLower.includes('workout') || productLower.includes('exercise') || 
      productLower.includes('gym') || productLower.includes('wellness') || productLower.includes('tracker') ||
      industryLower.includes('fitness') || industryLower.includes('health')) {
    categoryIdeas = ideasSet.fitness;
  } else if (productLower.includes('food') || productLower.includes('meal') || productLower.includes('recipe') || 
             productLower.includes('kitchen') || productLower.includes('cooking') || productLower.includes('dining') ||
             industryLower.includes('food') || industryLower.includes('restaurant')) {
    categoryIdeas = ideasSet.food;
  } else if (productLower.includes('tech') || productLower.includes('device') || productLower.includes('app') || 
             productLower.includes('software') || productLower.includes('digital') || productLower.includes('smart') ||
             industryLower.includes('tech') || industryLower.includes('technology')) {
    categoryIdeas = ideasSet.tech;
  } else if (productLower.includes('cloth') || productLower.includes('wear') || productLower.includes('apparel') || 
             productLower.includes('fashion') || productLower.includes('style') || productLower.includes('outfit') ||
             industryLower.includes('fashion') || industryLower.includes('apparel')) {
    categoryIdeas = ideasSet.fashion;
  } else if (productLower.includes('learn') || productLower.includes('course') || productLower.includes('education') || 
             productLower.includes('school') || productLower.includes('training') || productLower.includes('teach') ||
             industryLower.includes('education') || industryLower.includes('learning')) {
    categoryIdeas = ideasSet.education;
  }
  
  // If we have additional context, use it to customize the ideas slightly
  if (context.trim()) {
    return categoryIdeas.map(idea => {
      // Simple context integration - just append some relevant text
      const contextKeywords = context.toLowerCase().split(' ');
      const customized = { ...idea };
      
      // Modify description slightly based on context keywords
      if (contextKeywords.some(word => ['social', 'media', 'online'].includes(word))) {
        customized.description += " Perfect for social media and online engagement.";
      } else if (contextKeywords.some(word => ['budget', 'affordable', 'cost'].includes(word))) {
        customized.description += " Designed to maximize impact while staying budget-conscious.";
      } else if (contextKeywords.some(word => ['premium', 'luxury', 'exclusive'].includes(word))) {
        customized.description += " Tailored for premium audiences seeking exclusive experiences.";
      }
      
      return customized;
    });
  }
  
  return categoryIdeas;
};
