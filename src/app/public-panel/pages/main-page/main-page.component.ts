import { Component, OnInit, inject } from '@angular/core';
import { Category } from 'src/app/admin-panel/interfaces/category.interface';
import { PopularCategory } from 'src/app/admin-panel/interfaces/reports.interface';
import { CategoriesService } from 'src/app/admin-panel/services/categories.service';
import { environment } from 'src/app/environments/environments';

@Component({
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  topCategories: PopularCategory[] = [];
  baseUrl: string = environment.baseUrl;

  private categoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this.loadTopCategories();
  }

  loadTopCategories(): void {
    this.categoriesService.getPopularCategories(3).subscribe({
      next: (categories) => {
        this.topCategories = categories;
      },
      error: (err) => {
        console.error('Error al cargar las categorías más populares', err);
      }
    });
  }

  getCategoryImageUrl(popCategory: PopularCategory): string {
    if (popCategory.imagen) {
      return `${this.baseUrl}/categories/file/get?fileName=${popCategory.imagen}`;
    }
    // Imagen por defecto si no hay una imagen específica
    return 'assets/images/default-category.png';
  }
}
