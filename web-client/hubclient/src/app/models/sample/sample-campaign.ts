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
        "allowedValues":["Theme one", "Theme two", "Theme three"]
      },
      {
        'name': 'RAG_Status',
        'type': 'multiple-option',
        'allowedValues': [
           'RAG Staus One',
         'RAG Staus Two',
          'RAG Staus Three'
        ]
      }
  ]
};