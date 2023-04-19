import { Component } from '@angular/core';

@Component({
  selector: 'app-sample-data',
  templateUrl: './sample-data.component.html',
})
export class SampleDataComponent {
  data = this.generateData();
  displayedColumns = ['id', 'name', 'age', 'email', 'city'];

  onTableLoaded(loaded: boolean) {
    console.log('Table loaded:', loaded);
  }

  generateData() {
    const displayData = [];

    for (let i = 0; i < 10000; i++) {
      displayData.push({
        id: i + 1,
        name: `Test User ${i + 1}`,
        email: `testuser${i + 1}@example.com`,
        age: Math.floor(Math.random() * 50) + 18,
        city: ['New York', 'London', 'Paris', 'Tokyo'][
          Math.floor(Math.random() * 4)
        ],
        country: ['USA', 'UK', 'France', 'Japan'][
          Math.floor(Math.random() * 4)
        ],
      });
    }
    return displayData;
  }
}
