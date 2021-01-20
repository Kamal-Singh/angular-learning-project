import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map,tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private recipe: RecipeService, private http: HttpClient) {
    }

    onSaveData() {
        const recipes = this.recipe.getRecipes();
        this.http.put('https://recipe-project-e5d44-default-rtdb.firebaseio.com/recipe.json', recipes)
        .subscribe((response) => {
            console.log(response);
        })
    }

    onFetchData() {
        return this.http.get('https://recipe-project-e5d44-default-rtdb.firebaseio.com/recipe.json')
        .pipe(map((data: Recipe[]) => {
            return data.map((value) => {
                return {...value, ingredients: value.ingredients ? value.ingredients : ""};
            })
        }),
        tap((data: Recipe[]) => {
            this.recipe.setRecipes(data);
        }))
    }
}