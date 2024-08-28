import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TreeNode } from 'primeng/api';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'eshop-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent implements OnInit{
  filterMode = 'lenient';
  searchText!: string;


  @Output()
  searchTextChanged:EventEmitter<string>=new EventEmitter<string>();

  filterModes = [
      { label: 'Lenient', value: 'lenient' },
      { label: 'Strict', value: 'strict' }
  ];

  files!: TreeNode[];

  cols!: Column[];

  // constructor(private nodeService: NodeService) {}

  ngOnInit() {
  //     this.nodeService.getFilesystem().then((files) => (this.files = files));
      this.cols = [
          { field: 'name', header: 'Name' },
          { field: 'size', header: 'Size' },
          { field: 'type', header: 'Type' }
      ];
  }

  onSearchTextEntered(searchValue:string){
    this.searchText =searchValue;
  }
}
