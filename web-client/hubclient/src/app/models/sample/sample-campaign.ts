export const FirstCampaign = {
  'name': 'Campaign1',
  'description': 'Sample campaign',
  'startDate': '08-06-20',
  'endDate': '21-06-20',
  'campaignFields': [
    {
      
        'name': 'Technology',
        'type': 'text'      
    },
    {
        'name': 'Department',
        'type': 'text'
      },
      
      {
        'name': 'Theme',
        'type': 'single-option',
        "allowedValues":[ {
          'id': 'Theme 1',
          'value': 'Theme One'},
          {
            'id': 'Theme 2',
            'value': 'Theme two'},
            {
              'id': 'Theme 3',
              'value': 'Theme three'}]
      },
      {
        'name': 'RAG_Status',
        'type': 'multiple-option',
        'allowedValues': [{
           'id': 'RAG Staus 1',
           'value': 'RAG Staus One'},
           {
            'id': 'RAG Staus 2',
            'value': 'RAG Staus Two'},
            {
              'id': 'RAG Staus 3',
              'value': 'RAG Staus Three'}
        ]
      }
  ]
};

export const user = [
  {
      "username" : "admin",
      "email" : "admin_email",
      "password" : "$2y$12$OkLkVeg8KwP/FI7HPf0oleSkbln7hkza4ynPSEVOwOCOK9Ee86PIK",
      "fullName" : "Ajay",
      "enable" : true,
      "roles" : [
          {
              "id" : "5eeb9394fe28023d787d56ec",
              "role" : "ADMIN"
          }
      ]
  },
  {
      "username" : "sid",
      "email" : "siddhart.jain@ihsmarkit.com",
      "password" : "$2y$12$OkLkVeg8KwP/FI7HPf0oleSkbln7hkza4ynPSEVOwOCOK9Ee86PIK",
      "fullName" : "Siddharth Jain",
      "enable" : true,
      "roles" : [
          {
              "id" : "5eeb9394fe28023d787d56ec",
              "role" : "USER"
          }
      ]
  },
  {
      "username" : "Ajay",
      "email" : "ajaykumar.lamba@ihsmarkit.com",
      "password" : "$2y$12$OkLkVeg8KwP/FI7HPf0oleSkbln7hkza4ynPSEVOwOCOK9Ee86PIK",
      "fullName" : "Ajay Kumar Lamba",
      "enable" : true,
      "roles" : [
          {
              "id" : "5eeb9394fe28023d787d56ec",
              "role" : "USER"
          }
      ]
  },
  {
      "username" : "Abhinav",
      "email" : "abhinav.khattar@ihsmarkit.com",
      "password" : "$2y$12$OkLkVeg8KwP/FI7HPf0oleSkbln7hkza4ynPSEVOwOCOK9Ee86PIK",
      "fullName" : "Abhinav Khattar",
      "enable" : true,
      "roles" : [
          {
              "id" : "5eeb9394fe28023d787d56ec",
              "role" : "USER"
          }
      ]
  },
  {
      "username" : "Rakesh",
      "email" : "rakesh.mahajan@ihsmarkit.com",
      "password" : "$2y$12$OkLkVeg8KwP/FI7HPf0oleSkbln7hkza4ynPSEVOwOCOK9Ee86PIK",
      "fullName" : "Rakesh Mahajan",
      "enable" : true,
      "roles" : [
          {
              "id" : "5eeb9394fe28023d787d56ec",
              "role" : "USER"
          }
      ]
  }
  ];