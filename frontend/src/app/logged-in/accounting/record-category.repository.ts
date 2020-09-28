import {Injectable} from '@angular/core';
import {waitFor} from '../../utils';

export interface RecordCategory {
  id: string;
  name: string;
  taxAuthorityNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecordCategoryRepository {
  categories: RecordCategory[] = [];
  categoriesLoaded = false;

  async find(): Promise<RecordCategory[]> {
    if (!this.categoriesLoaded) {
      this.categoriesLoaded = true;
      await waitFor(500);
      this.categories = [
        {
          id: '1',
          name: 'Bürokosten',
          taxAuthorityNumber: '9230'
        },
        {
          id: '2',
          name: 'FA-Zahllast',
          taxAuthorityNumber: '9230'
        },
      ];
      this.categoriesLoaded = false;
    }
    return Promise.resolve(this.categories);
  }
}
