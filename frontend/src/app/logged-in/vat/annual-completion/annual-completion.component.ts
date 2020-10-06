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

  async ngOnInit(): Promise<void> {
    this.annualCompletions = await this.annualCompletionRepository.findAll();
  }

  async markDone(data: VatAnnualCompletion): Promise<void> {
    await this.annualCompletionRepository.change(data.id, {
      taxAuthoritySubmitted: true,
    });
  }
}
