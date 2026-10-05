import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Prices } from './components/prices/prices';
import { Calculator } from './components/calculator/calculator';
import { Trend } from './components/trend/trend';
import { History } from './components/history/history';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Prices, Calculator, Trend, History, Footer],
  templateUrl: './app.html',
})
export class App {}
