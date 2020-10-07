import {Component, OnInit} from '@angular/core';
import {AnnualCompletionRepository, VatAnnualCompletion} from './annual-completion.repository';

@Component({
  selector: 'app-vat-annual-completion',
  templateUrl: './annual-completion.component.html',
})
export class AnnualCompletionComponent implements OnInit{
  details: VatAnnualCompletion = undefined;
  detailsOpen = false;
  newOpen = false;
  annualCompletions: VatAnnualCompletion[] = [];

  constructor(private annualCompletionRepository: AnnualCompletionRepository) {}

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async refresh(): Promise<void> {
    this.annualCompletions = await this.annualCompletionRepository.findAll();
  }

  async showDetails(data: VatAnnualCompletion): Promise<void>{
    this.details = undefined;
    this.detailsOpen = true;
    this.details = data;
  }

  closeDetails(): void {
    this.detailsOpen = false;
    this.details = undefined;
  }

  closeNew(): void {
    this.newOpen = false;
  }



  async markDone(data: VatAnnualCompletion): Promise<void> {
    await this.annualCompletionRepository.change(data.id, {
      taxAuthoritySubmitted: true,
    });
  }

  async handleNewResult(result: boolean): Promise<void> {
    this.newOpen = false;
    if (result) {
      await this.refresh();
    }
  }
}
