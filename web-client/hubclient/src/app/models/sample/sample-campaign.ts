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