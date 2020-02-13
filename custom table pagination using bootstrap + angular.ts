// HTML

 <nav aria-label="Page navigation text-right" class="my-3">
            <div class="d-flex justify-content-between">
                <span class="d-flex justify-content-start align-items-baseline">
                    Show: &nbsp;
                    <div class="input-group" style="width: 60px">
                        <select [(ngModel)]="pageSize" (change)="onChangePageSize($event.target.value)"
                            class="custom-select" id="inputGroupSelect01">
                            <option value=5>5</option>
                            <option value=10>10</option>
                            <option value=15>15</option>
                            <option value=20>20</option>
                            <option value=25>25</option>
                        </select>
                    </div>
                    &nbsp; per page
                </span>
                <span class="d-flex justify-content-end align-items-baseline">
                    <div class="pr-3"><a class="text-decoration-none text-dark"
                            href="javascript:void(0)">{{startRecord}}</a>-
                        <a class="text-decoration-none text-dark" href="javascript:void(0)">{{endRecord}}</a> of
                        <a class="text-decoration-none text-dark" href="javascript:void(0)">{{totalRecordsCount}}</a>
                    </div>
                    <ul class="pagination mb-0">
                        <li class="page-item">
                            <a class="page-link" (click)="previous()" href="javascript:void(0)" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" (click)="next()" href="javascript:void(0)" aria-label="Next"
                                [class.disabled]="(pageSize * pageNo) >= totalRecordsCount">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </span>
            </div>
        </nav>
        
        
       // Type Script
       
         pageSize = 5;
          pageNo = 1;
          totalRecordsCount = 20;
          startRecord = 1;
          endRecord = 5;
          
         
  onChangePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNo = 1;
    this.setRecordRange(this.pageNo, this.pageSize);
    this.loadAllUsers();
  }

  next() {
    this.pageNo += 1;
    this.setRecordRange(this.pageNo, this.pageSize);
    this.loadAllUsers();
  }

  previous() {
    this.pageNo -= 1;
    if(this.pageNo === 0){
      this.pageNo = 1;
      return;
    }
    this.setRecordRange(this.pageNo, this.pageSize);
    this.loadAllUsers();
  }

  setRecordRange(pageNo: number, pageSize: number){
    this.startRecord = (pageNo * pageSize) - (pageSize - 1);
    this.endRecord = (pageNo * pageSize);
    if(this.endRecord > this.totalRecordsCount){
      this.endRecord = this.totalRecordsCount;
    }
  }
